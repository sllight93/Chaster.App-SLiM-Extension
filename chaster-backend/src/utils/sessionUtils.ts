// src/utils/sessionUtils.ts

import { PartnerExtensionsApi, PatchExtensionSessionDto, GetPartnerSessionRepDto } from '@chasterapp/chaster-js';
import { AxiosResponse } from 'axios';
import { UpdatePrivateSessionDto, PrivateSessionDto } from '../schema/config.dto';
import { Logger } from '@nestjs/common';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('SessionUtils');

/**
 * Ermittelt die Authentifizierungsdaten für eine Session anhand eines Tokens.
 *
 * Diese Funktion ruft die Session-Informationen von der PartnerExtensionsApi ab, indem sie
 * den übergebenen Token, den Client-Identifier und das API-Token verwendet. Wird keine
 * Session-ID in der Antwort gefunden, so wird ein Fehler ausgelöst.
 *
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Promise, das ein Objekt mit den folgenden Eigenschaften auflöst:
 *  - sessionId: Die aktuell gültige Session-ID.
 *  - mainToken: Der übergebene Token (als Haupttoken).
 *  - apiKey: Das API-Token.
 *  - clientId: Der Client-Identifier.
 *  - lockId: Die Lock-ID der Session.
 *
 * @throws Fehler, wenn einer der Parameter fehlt oder die Session nicht abgerufen werden kann.
 *
 * @example
 * const authData = await getSessionAuthData('sessionToken123');
 * console.log(authData.sessionId);
 */
export async function getSessionAuthData(token: string): Promise<{ sessionId: string; mainToken: string; apiKey: string; clientId: string; lockId: string }> {
  const clientId = process.env.X_CHASTER_CLIENT_ID;
  const apiToken = process.env.CHASTER_API_TOKEN;

  if (!token || !clientId || !apiToken) {
    throw new Error('Fehlende Parameter: token, clientId oder CHASTER_API_TOKEN');
  }

  try {
    const response = await partnerExtensionsApi.getSessionAuth(token, clientId, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'X-CHASTER-CLIENT-ID': clientId,
      },
    });

    if (!response.data.session?.sessionId) {
      throw new Error('Keine Session-ID in der Antwort');
    }

    return {
      sessionId: response.data.session.sessionId,
      mainToken: token,
      apiKey: apiToken,
      clientId,
      lockId: response.data.session.lock._id,
    };
  } catch (error: any) {
    logger.error('Fehler beim Abrufen der Session-Infos:', error.response?.data || error.message);
    throw new Error('Session konnte nicht abgerufen werden');
  }
}

/**
 * Ruft die aktuelle Konfiguration ab.
 * Es wird angenommen, dass die API-Antwort ein session-Objekt enthält, in dem:
 *  - Die Konfiguration unter session.config zu finden ist.
 *  - metadata und data auf oberster Ebene enthalten sind.
 *
 * @param token - Das Token, über das intern die Session ermittelt wird.
 * @param options - Optionale zusätzliche Request-Parameter.
 * @returns Die gesäuberte Konfiguration als SetConfigDto.
 */
export async function getSession(token: string, options?: any): Promise<UpdatePrivateSessionDto> {
  logger.debug(`Rufe Konfiguration für Token ${token} ab.`);
  const sessionInfo = await getSessionAuthData(token);
  const authOptions = {
    headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    ...options,
  };
  const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(
    sessionInfo.sessionId,
    authOptions
  );
  const session = (response.data as any).session;
  logger.debug(`Erhaltene Session: ${JSON.stringify(session)}`);

  const strippedConfig: UpdatePrivateSessionDto = stripConfig(session);
  logger.debug(`Gesäuberte Konfiguration: ${JSON.stringify(strippedConfig)}`);

  return strippedConfig;
}

/**
 * Aktualisiert (merged) die Konfiguration.
 * Zunächst wird die bestehende Konfiguration abgerufen. Anschließend werden die neuen Werte
 * per Shallow-Merge in die aktuelle Konfiguration integriert (bestehende Felder werden durch die neuen ersetzt).
 * Das vollständige, gemergte Objekt wird dann versendet.
 *
 * @param token - Das Token, über das intern die Session ermittelt wird.
 * @param newConfig - Ein Teilobjekt des SetConfigDto, das die zu aktualisierenden Felder enthält.
 * @param options - Optionale zusätzliche Request-Parameter.
 */
export async function updateSession(token: string, newConfig: UpdatePrivateSessionDto, options?: any): Promise<{success: boolean}> {
  logger.debug(`Update Konfiguration für Token ${token} mit neuen Werten: ${JSON.stringify(newConfig)}`);
  const sessionInfo = await getSessionAuthData(token);
  const authOptions = {
    headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    ...options,
  };

  const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(sessionInfo.sessionId, authOptions);
  const session = (response.data as any).session;
  const currentConfig: UpdatePrivateSessionDto = stripConfig(session);

  // Shallow-Merge für jeden Top-Level-Bereich
  const mergedConfig: UpdatePrivateSessionDto = {
    config: { ...currentConfig.config, ...newConfig.config! },
    metadata: { ...currentConfig.metadata, ...(newConfig.metadata! || {}) },
    data: { ...currentConfig.data, ...(newConfig.data! || {}) },
  };

  logger.debug(`Gemergte Konfiguration: ${JSON.stringify(mergedConfig)}`);

  const patchDto: PatchExtensionSessionDto = {
    config: mergedConfig.config,
    metadata: mergedConfig.metadata,
    data: mergedConfig.data,
  };

  await partnerExtensionsApi.patchExtensionSession(sessionInfo.sessionId, patchDto, authOptions);
  logger.debug(`Konfiguration erfolgreich aktualisiert für Session ${sessionInfo.sessionId}.`);
  return { success: true };
}


/**
 * Entfernt alle nicht im Schema definierten Felder aus der Konfiguration.
 * Es wird angenommen, dass das erlaubte Schema im Feld session.config folgende Schlüssel vorsieht:
 * difficulty, votes_target, count_only_loggedin, split, daily_quota, punish_mult.
 * 
 * Dabei bleibt die komplette, eventuell verschachtelte Struktur der einzelnen Felder erhalten.
 * metadata und data werden aus dem übergebenen session-Objekt vollständig übernommen.
 *
 * @param session - Das Session-Objekt, wie es von der API zurückgegeben wird.
 * @returns Die gesäuberte Konfiguration als SetConfigDto.
 */
function stripConfig(session: any): PrivateSessionDto {
  const allowedConfig = {
    difficulty: session.config?.difficulty,
    votes_target: session.config?.votes_target,
    count_only_loggedin: session.config?.count_only_loggedin,
    split: session.config?.split,
    daily_quota: session.config?.daily_quota,
    punish_mult: session.config?.punish_mult,
  };

  const allowedLock = {
    keyholder: {
      username: session.lock?.keyholder?.username,
      avatarUrl: session.lock?.keyholder?.avatarUrl,
      online: session.lock?.keyholder?.online,
    },
    user: {
      username: session.lock?.user?.username,
      avatarUrl: session.lock?.user?.avatarUrl,
      online: session.lock?.user?.online,
    },
    _id: session.lock?._id,
    status: session.lock?.status,
    canBeUnlocked: session.lock?.canBeUnlocked,
    totalDuration: session.lock?.totalDuration,
    hideTimeLogs: session.lock?.hideTimeLogs,
    isAllowedToViewTimeLogs: session.lock?.isAllowedToViewTimeLogs,
    isFrozen: session.lock?.isFrozen,
    frozenAt: session.lock?.frozenAt,
    startDate: session.lock?.startDate,
    endDate: session.lock?.endDate,
    displayRemainingTime: session.lock?.displayRemainingTime,
    title: session.lock?.title,
    lastVerificationPicture: session.lock?.lastVerificationPicture,
    extensionAllowUnlocking: session.lock?.extensionAllowUnlocking,
  };

  return {
    config: allowedConfig,
    metadata: session.metadata || {},
    data: session.data || {},
    // Das lock-Objekt wird nicht gestript und steht somit für die Anzeige bereit.
    lock: allowedLock,
  };
}
