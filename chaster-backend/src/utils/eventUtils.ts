import { AxiosResponse } from 'axios';
import { Logger } from '@nestjs/common';

import * as defaults from '../config/config';

import { setTime } from './lockUtils';
import { createLogEntry } from './logUtils';
import { 
  PartnerExtensionsApi, 
  PatchExtensionSessionDto, 
  GetPartnerSessionRepDto, 
  ExtensionSessionCreated, 
  ExtensionSessionCreatedEventEnum,
  ActionLogCreated,
  ActionLogCreatedData, 
  ActionLogCreatedEventEnum, 
  ExtensionSessionForPartner,
  PartnerMetadata,
 } from '@chasterapp/chaster-js';

import {  
  EventDto, 
   } from '../schema/config.dto';
import {  
  ConfigDto,
  DataDto, 
  MetadataDto,
  DifficultyDto,
  HomeActionsDto,
} from '../schema/extensionConfig.dto';



const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('SessionUtils');

// ########## FINISHED ##########
// handle incoming event function
export function handleEvent(input: EventDto) {
  if (input.event === ExtensionSessionCreatedEventEnum.ExtensionSessionCreated) {
    sessionCreated(input as ExtensionSessionCreated);
  } else if (input.event === ActionLogCreatedEventEnum.ActionLogCreated) {
    
    const { data } = input as ActionLogCreated;
    const { actionLog } = data as ActionLogCreatedData;

    switch (actionLog.type) {
      case 'lock_frozen':
        logger.debug('Handling lock_frozen event with data:', actionLog);
        break;
      case 'lock_unfrozen':
        logger.debug('Handling lock_unfrozen event with data:', actionLog);
        break;
      case 'keyholder_trusted':
        logger.debug('Handling keyholder_trusted event with data:', actionLog);
        break;
      case 'link_time_changed':
        linkTimeChanged(data as ActionLogCreatedData);
        break;
      case 'pillory_in':
        logger.debug('Handling pillory_in event with data:', actionLog);
        break;
      case 'pillory_out':
        logger.debug('Handling pillory_out event with data:', actionLog);
        break;
      default:
        logger.warn(`No handler found for action log type: ${actionLog.type}`);
    }
  } else {
    logger.warn(`No handler found for event: ${input.event}`);
  }
}
// ##############################

// ########## FINISHED ##########
// set homeActions and reasonsPreventingUnlocking at start lock creation
async function sessionCreated(input : ExtensionSessionCreated) {

  const { sessionId } = input.data.session;

  logger.debug('Handling locked event for session:', sessionId);

  try {
    // API call for sessionData
    const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(sessionId, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });

    const updatedSession = (response.data).session as ExtensionSessionForPartner;
    
    const config = updatedSession.config as ConfigDto;
    let metadata = updatedSession.metadata as PartnerMetadata;
    let data = updatedSession.data as DataDto;
    
    const defaultReasonsPreventingUnlocking: Array<string> = defaults.reasonsPreventingUnlocking.map(reason => reason.reason);
    let defaultHomeActions: HomeActionsDto[] = defaults.homeActions;

    // Construct homeActions for the frontend only if daily_quota > 0
    metadata = {
      reasonsPreventingUnlocking: defaultReasonsPreventingUnlocking,
      homeActions: config.daily_quota > 0
        ? defaultHomeActions.map(action => ({
            ...action,
            badge: config.daily_quota.toString()
          }))
        : metadata.homeActions // Retain existing homeActions when daily_quota is not greater than 0
    };

    const patchDto: PatchExtensionSessionDto = {
      config: config,
      metadata: metadata,
      data: data,
    };

    await partnerExtensionsApi.patchExtensionSession(sessionId, patchDto, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });
    logger.debug(`Updated metadata successfully for sessionID: ${sessionId}`);
    return { success: true };
  } catch (error: any) {
    logger.error(`Error while updating metadata for sessionID ${sessionId}:`, error.response?.data || error.message);
    return { success: false };
  }
}
// ##############################

// ########## FINISHED ##########
// handle link_time_changed event
async function linkTimeChanged(input : ActionLogCreatedData) {
  logger.debug('Handling link_time_changed event with data:', input.actionLog);

  const time = (input.actionLog.payload as { duration: number }).duration;
  const username = input.actionLog?.user?.username ?? "Visitor";
  const sessionId = input.sessionId;

  const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(input.sessionId, {
    headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` }
  });

  const sessionData = (response.data).session;
  const config = sessionData.config as ConfigDto;
  const action = selectWeightedRandomAction(config.difficulty);
  
  switch (action) {
    case 'nothing':
      logger.debug('No action taken.');
      await voteHandler(time, sessionData);
      break;
    case 'invert':
      logger.debug('Inverting time for user:', username);
      await voteHandler(time, sessionData);
      await createLogEntry(sessionId, { title: 'Mouse slip', description: ` ${username} clearly hit the wrong button.` });
      await setTime(sessionId, -time * 2 * config.punish_mult);
      break;
    case 'double':
      logger.debug('Doubling time for user:', username);
      await voteHandler(time, sessionData);
      await createLogEntry(sessionId, { title: 'Lucky vote', description: `Critical vote by ${username}. It count's twice!` });
      await setTime(sessionId, time * 2 * config.punish_mult);
      break;
    case 'double_invert':
      logger.debug('Doubling and inverting time for user:', username);
      await voteHandler(time, sessionData);
      await createLogEntry(sessionId, { title: 'This doesn\'t look right...', description: `Invalid vote by ${username}. It has been corrected.` });
      await setTime(sessionId, -time * 3 * config.punish_mult);
      break;
    case 'jackpot':
      logger.debug('Jackpot! Special action for user:', username);
      await voteHandler(time, sessionData);
      await createLogEntry(sessionId, { title: 'Jackpot!', description: `${username} hit the Jackpot! Vote was multiplied by 10!` });
      await setTime(sessionId, time * 9 * config.punish_mult);
      break;
    default:
      logger.warn('Unknown action:', action);
  }
}
// ##############################

// ########## FINISHED ##########
// handle vote data
async function voteHandler(duration: number, sessionData: ExtensionSessionForPartner): Promise<{success: boolean}> {
  
  const sessionId = sessionData.sessionId as string;
  const config = sessionData.config as ConfigDto;
  let data = sessionData.data as DataDto;
  let metadata = sessionData.metadata as MetadataDto;

  logger.debug(`Increasing daily votes for session ${sessionId}`);

  try {
    //erhöht die Anzahl der heutigen Votes, der totalen Votes und ggf. der votes die gewertet werden
    if (sessionData.data && data.votes) {
      data.votes.today++;
      data.votes.total++;
      if (config?.hardcore && data.votes.today < config.daily_quota) {
        data.votes.eligible++;
      }
    }
    //Prüft ob alle täglichen aktionen erreicht wurden
    if (data.votes.today == config.daily_quota) {
      metadata = {
        reasonsPreventingUnlocking: [],
        homeActions: [],
      };
    } else {
      //verringert die nötigen Aktionen für heute um eins
      metadata?.homeActions?.forEach(action => {
        if (typeof action.badge === 'string') {
          let badgeNumber = parseInt(action.badge, 10);
          badgeNumber--;
          action.badge = badgeNumber.toString();
        }
      });
    }

     // Rebuild metadata to match the MetadataDto schema (removing unwanted properties)
     const cleanMetadata: MetadataDto = {
      reasonsPreventingUnlocking: (metadata && metadata.reasonsPreventingUnlocking) || [],
      homeActions: (metadata && metadata.homeActions) || []
    };

    const patchDto: PatchExtensionSessionDto = {
      config: config,
      metadata: cleanMetadata,
      data: data,
    };

    await partnerExtensionsApi.patchExtensionSession(sessionId, patchDto, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });

    logger.debug(`Metadaten erfolgreich aktualisiert für Session ${sessionId}`);
    return { success: true };
  } catch (error: any) {
    logger.error('Fehler beim Aktualisieren der Metadaten:', error.response?.data || error.message);
    return { success: false };
  }
}
// ##############################

// ########## FINISHED ##########
// randomly select weighted actions
function selectWeightedRandomAction(actionWeights: DifficultyDto[]): string {
  const totalWeight = actionWeights.reduce((sum, { weight }) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (const { type, weight } of actionWeights) {
    if (random < weight) {
      return type;
    }
    random -= weight;
  }
  
  // Statt einen Fehler zu werfen, geben wir "nothing" zurück
  return "nothing";
}
// ##############################


