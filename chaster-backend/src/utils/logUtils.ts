// src/utils/logUtils.ts

import { PartnerExtensionsApi, PartnerCustomLogActionDto, ActionLogRoleEnum } from '@chasterapp/chaster-js';
import { getSessionAuthData } from '../utils/sessionUtils';
import { Logger } from '@nestjs/common';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('LogUtils');

/**
 * Erstellt einen Logeintrag.
 *
 * Ermittelt die Session-Informationen anhand des übergebenen Tokens, erstellt einen Logeintrag 
 * und übermittelt diesen an die PartnerExtensionsApi.
 *
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @param logData - Ein Objekt mit folgenden Eigenschaften:
 *   - title: Der Titel des Logeintrags.
 *   - description: Die Beschreibung des Logeintrags.
 *   - icon: (Optional) Das FontAwesome-Icon bezogen auf v5 (ohne den `fa-` Prefix). Siehe https://fontawesome.com/v5/search?o=r&s=regular.
 *   - color: (Optional) Die Farbe des Logeintrags.
 * @returns Ein Promise, das bei Erfolg erfüllt wird; bei einem Fehler wird ein entsprechender Fehler geworfen.
 *
 * @example
 * const result = await createLogEntry('sessionToken123', {
 *   title: 'Aktion durchgeführt',
 *   description: 'Die Aktion wurde erfolgreich durchgeführt.',
 *   icon: 'info-circle',
 *   color: '#FF0000'
 * });
 */
export async function createLogEntry(
  token: string,
  logData: { title: string; description: string; icon?: string; color?: string | null }
): Promise<void> {
  if (!token) {
    throw new Error('Fehlende Parameter: sessionId oder token');
  }

  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Ermittelte SessionInfo: ${JSON.stringify(sessionInfo)}`);

  const logEntry: PartnerCustomLogActionDto = {
    title: logData.title,
    description: logData.description,
    role: ActionLogRoleEnum.Extension,
    icon: logData.icon as any,
    color: logData.color ?? null,
  };

  try {
    await partnerExtensionsApi.logCustomAction(sessionInfo.sessionId, logEntry, {
      headers: { Authorization: `Bearer ${sessionInfo.apiKey}` },
    });
    logger.debug(`Logeintrag erfolgreich erstellt für Session ${sessionInfo.sessionId}`);
  } catch (error) {
    logger.error('Fehler beim Erstellen des Log-Eintrags:', error.stack);
    throw new Error('Log konnte nicht erstellt werden');
  }
}
