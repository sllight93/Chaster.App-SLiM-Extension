import { 
  PartnerExtensionsApi, 
  FreezeLockActionModel, 
  FreezeLockActionModelNameEnum,
  UnfreezeLockActionModel, 
  UnfreezeLockActionModelNameEnum,
  ToggleFreezeLockActionModel, 
  ToggleFreezeLockActionModelNameEnum,
  PilloryLockActionModel, 
  PilloryLockActionParamsModel,  
  PilloryLockActionModelNameEnum,
  AddTimeLockActionModel, 
  AddTimeLockActionModelNameEnum,
  RemoveTimeLockActionModel, 
  RemoveTimeLockActionModelNameEnum,
} from '@chasterapp/chaster-js';
import { getSessionAuthData } from './sessionUtils';
import { Logger } from '@nestjs/common';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('LockUtils');

/**
 * Führt den Freeze-Lock-Vorgang durch.
 *
 * Ermittelt zuerst die Session-Informationen anhand des übergebenen Tokens, 
 * erstellt ein FreezeLockAction-Objekt und übermittelt diese Aktion an die PartnerExtensionsApi.
 *
 * @param token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns Ein Promise mit einem Objekt, das den Erfolg und eine entsprechende Nachricht enthält.
 *
 * @example
 * const result = await freezeLock('sessionToken123');
 * console.log(result); // { success: true, message: "Freeze action successfully processed" }
 */
export async function freezeLock(token: string): Promise<{ success: boolean; message: string}> {
  logger.debug("Pending Freeze...");
  
  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);
  
  const action: FreezeLockActionModel = {
    name: FreezeLockActionModelNameEnum.Freeze,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );
  
  logger.debug(`Freeze action result: ${JSON.stringify(result)}`);
  return {
    success: true,
    message: "Freeze action successfully processed",
  };
}

/**
 * Führt den Unfreeze-Lock-Vorgang durch.
 *
 * Ermittelt zuerst die Session-Informationen anhand des Tokens, erstellt ein UnfreezeLockAction-Objekt
 * und übermittelt diese Aktion an die PartnerExtensionsApi.
 *
 * @param token - Das Authentifizierungs-Token zur Ermittlung der Session.
 * @returns Ein Promise mit einem Objekt, das den Erfolg und eine entsprechende Nachricht enthält.
 */
export async function unfreezeLock(token: string): Promise<{ success: boolean; message: string }> {
  logger.debug("Pending Unfreeze...");
  
  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);

  const action: UnfreezeLockActionModel = {
    name: UnfreezeLockActionModelNameEnum.Unfreeze,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );
  
  logger.debug(`Unfreeze action result: ${JSON.stringify(result)}`);
  return {
    success: true,
    message: "Unfreeze action successfully processed",
  };
}

/**
 * Führt den ToggleFreeze-Lock-Vorgang durch.
 *
 * Ermittelt anhand des Tokens die Session-Informationen, erstellt ein ToggleFreezeLockAction-Objekt
 * und übermittelt die Aktion über die PartnerExtensionsApi.
 *
 * @param token - Das Authentifizierungs-Token.
 * @returns Ein Promise mit einem Objekt, das den Erfolg und eine entsprechende Nachricht enthält.
 */
export async function toggleFreezeLock(token: string): Promise<{ success: boolean; message: string }> {
  logger.debug("Pending Toggle Freeze...");
  
  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);

  const action: ToggleFreezeLockActionModel = {
    name: ToggleFreezeLockActionModelNameEnum.ToggleFreeze,
  };
  
  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );
  
  logger.debug(`ToggleFreeze action result: ${JSON.stringify(result)}`);
  return {
    success: true,
    message: "ToggleFreeze action successfully processed",
  };
}

/**
 * Führt den Pillory-Lock-Vorgang durch.
 *
 * Ermittelt die Session-Informationen mittels Token, erstellt die erforderlichen Parameter für den Pillory-Lock,
 * übergibt diese an die PartnerExtensionsApi und löst die entsprechende Aktion aus.
 *
 * @param token - Das Authentifizierungs-Token.
 * @param duration - Die Dauer des Pillory-Locks.
 * @param reason - Der Grund für den Pillory-Lock.
 * @returns Ein Promise mit einem Objekt, das den Erfolg und eine entsprechende Nachricht enthält.
 */
export async function pilloryLock(token: string, duration: number, reason: string): Promise<{ success: boolean; message: string }> {
  logger.debug("Pending Pillory...");
  
  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);

  const params: PilloryLockActionParamsModel = {
    duration,
    reason,
  };

  const action: PilloryLockActionModel = {
    name: PilloryLockActionModelNameEnum.Pillory,
    params,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );
  
  logger.debug(`Pillory action result: ${JSON.stringify(result)}`);
  return {
    success: true,
    message: "Pillory action successfully processed",
  };
}

/**
 * Führt den AddTime-Lock-Vorgang durch.
 *
 * Ermittelt die Session-Informationen, erstellt ein AddTimeLockAction-Objekt mit der angegebenen Zeit (in Sekunden)
 * und übermittelt diese Aktion an die PartnerExtensionsApi.
 *
 * @param token - Das Authentifizierungs-Token.
 * @param duration - Die Zeit in Sekunden, die zum Lock hinzugefügt werden soll.
 * @returns Ein Promise mit einem Objekt, das den Erfolg und eine entsprechende Nachricht enthält.
 */
export async function addTimeLock(token: string, duration: number ): Promise<{ success: boolean; message: string }> {
  logger.debug("Pending Add Time...");
  
  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);

  const action: AddTimeLockActionModel = {
    name: AddTimeLockActionModelNameEnum.AddTime,
    params: duration,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );

  logger.debug(`AddTime action result: ${JSON.stringify(result)}`);
  return {
    success: true,
    message: "Add Time action successfully processed",
  };
}

/**
 * Führt den RemoveTime-Lock-Vorgang durch.
 *
 * Ermittelt anhand des Tokens die Session-Informationen, erstellt ein RemoveTimeLockAction-Objekt mit der angegebenen Zeit (in Sekunden)
 * und übermittelt diese Aktion an die PartnerExtensionsApi.
 *
 * @param token - Das Authentifizierungs-Token.
 * @param duration - Die Zeit in Sekunden, die vom Lock entfernt werden soll.
 * @returns Ein Promise mit einem Objekt, das den Erfolg und eine entsprechende Nachricht enthält.
 */
export async function removeTimeLock(token: string, duration: number ): Promise<{ success: boolean; message: string }> {
  logger.debug("Pending Remove Time...");
  
  const sessionInfo = await getSessionAuthData(token);
  logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);

  const action: RemoveTimeLockActionModel = {
    name: RemoveTimeLockActionModelNameEnum.RemoveTime,
    params: duration,
  };

  const result = await partnerExtensionsApi.doAction(
    sessionInfo.sessionId,
    { action: action },
    { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
  );

  logger.debug(`RemoveTime action result: ${JSON.stringify(result)}`);
  return {
    success: true,
    message: "Remove Time action successfully processed",
  };
}