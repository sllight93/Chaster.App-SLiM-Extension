import { Logger } from '@nestjs/common';
import { 
  PartnerExtensionsApi, 
  SubmitRegularActionDto 
} from '@chasterapp/chaster-js';
import { getSessionAuthData } from './sessionUtils';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('ActionsUtils');

/**
 * Führt den Freeze-Lock-Vorgang durch.
 *
 * Diese Funktion dient dazu, eine Aktion (Freeze-Lock) im System zu submitten. 
 * Sie ermittelt zunächst die Session-Informationen anhand des übergebenen Tokens, erstellt
 * ein Payload-Objekt und übermittelt diese Aktion an die PartnerExtensionsApi.
 *
 * @param {string} token - Das Authentifizierungs-Token, das zur Ermittlung der Session verwendet wird.
 * @returns {Promise<{ success: boolean; message: string }>} Ein Objekt mit Erfolgsmeldung.
 *
 * @example
 * const result = await freezeLock('sessionToken123');
 * console.log(result); // { success: true, message: "Regular Action successfully processed" }
 */
export async function freezeLock(token: string): Promise<{ success: boolean; message: string }> {
  // Logging für Debugging und Produktion
  logger.debug('Pending Regular Action...');
  
  try {
    const sessionInfo = await getSessionAuthData(token);
    logger.debug(`Session-Informationen: ${JSON.stringify(sessionInfo)}`);
  
    const payload: SubmitRegularActionDto = {
      payload: {
        message: "string",
        nbActionsRemaining: 1,
        nextActionDate: "string",
        regularity: 0,
        mode: "cumulative"
      }
    };
  
    const result = await partnerExtensionsApi.submitRegularAction(
      sessionInfo.sessionId,
      payload,
      { headers: { Authorization: `Bearer ${sessionInfo.apiKey}` } }
    );
    logger.debug(`Ergebnis der Aktion: ${JSON.stringify(result)}`);
  
    return {
      success: true,
      message: "Regular Action successfully processed",
    };
  } catch (error) {
    logger.error('Fehler bei der Verarbeitung der Regular Action', error.stack);
    throw error;
  }
}
