import { setTime } from './lockUtils';
import { createLogEntry } from './logUtils';
import { getMetadata } from './sessionUtils';
import { PartnerExtensionsApi, PatchExtensionSessionDto, GetPartnerSessionRepDto, ActionLogCreated, ActionLogCreatedEventEnum, ActionLogForPublic } from '@chasterapp/chaster-js';
import { AxiosResponse } from 'axios';
import { UpdatePrivateSessionDto, PrivateSessionDto, MetadataDto, EventDto, DifficultyDto } from '../schema/config.dto';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';


const defaultConfig = {
  config: {
      difficulty: [
      {
          type: "invert",
          weight: 40
      },
      {
          type: "double",
          weight: 40
      },
      {
          type: "double_invert",
          weight: 25
      },
      {
          type: "jackpot",
          weight: 1
      },
      {
          type: "nothing",
          weight: 320
      }
      ],
      votes_target: 56,
      hardcore: false,
      split: 50,
      daily_quota: 5,
      punish_mult: 1.0
  },
  metadata: {
      reasonsPreventingUnlocking: ["You need to fullfill your daily quota! Send your shared link to more people."],
      homeActions: [
          {
              slug: "vote",
              title: "Daily quota not reached!", 
              description: "You need to fullfill your daily quota! Send your shared link to more people.",
              icon: "fa-link",
              badge: "5"
          }
      ]
  },
  data: {
      votes: {
          total: 0,
          eligible: 0,
          today: 0
      }
} 
};

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('SessionUtils');

// Funktion zum Verarbeiten von ActionLogForPublic-Events
function handleActionLogCreated(data: ActionLogCreated) {
  if (!data || !data.data || !data.data.actionLog) {
    console.error('Invalid data structure for ActionLogCreated:', data);
    return;
  }

  const actionLog = data.data.actionLog;
  switch (actionLog.type) {
    case 'locked':
      
      break;
    case 'unlocked':
      logger.debug('Handling unlocked event with data:', actionLog);
      break;
    case 'deserted':
      logger.debug('Handling deserted event with data:', actionLog);
      break;
    case 'timer_hidden':
      logger.debug('Handling timer_hidden event with data:', actionLog);
      break;
    case 'timer_revealed':
      logger.debug('Handling timer_revealed event with data:', actionLog);
      break;
    case 'time_logs_hidden':
      logger.debug('Handling time_logs_hidden event with data:', actionLog);
      break;
    case 'time_logs_revealed':
      logger.debug('Handling time_logs_revealed event with data:', actionLog);
      break;
    case 'time_changed':
      logger.debug('Handling time_changed event with data:', actionLog);
      break;
    case 'locktober_points_changed':
      logger.debug('Handling locktober_points_changed event with data:', actionLog);
      break;
    case 'combination_verified':
      logger.debug('Handling combination_verified event with data:', actionLog);
      break;
    case 'combination_failed':
      logger.debug('Handling combination_failed event with data:', actionLog);
      break;
    case 'lock_frozen':
      logger.debug('Handling lock_frozen event with data:', actionLog);
      break;
    case 'lock_unfrozen':
      logger.debug('Handling lock_unfrozen event with data:', actionLog);
      break;
    case 'session_offer_accepted':
      logger.debug('Handling session_offer_accepted event with data:', actionLog);
      break;
    case 'max_limit_date_increased':
      logger.debug('Handling max_limit_date_increased event with data:', actionLog);
      break;
    case 'max_limit_date_removed':
      logger.debug('Handling max_limit_date_removed event with data:', actionLog);
      break;
    case 'keyholder_trusted':
      logger.debug('Handling keyholder_trusted event with data:', actionLog);
      break;
    case 'link_time_changed':
      handleLinkVote(data)
      break;
    case 'dice_rolled':
      logger.debug('Handling dice_rolled event with data:', actionLog);
      break;
    case 'timer_guessed':
      logger.debug('Handling timer_guessed event with data:', actionLog);
      break;
    case 'pillory_in':
      logger.debug('Handling pillory_in event with data:', actionLog);
      break;
    case 'pillory_out':
      logger.debug('Handling pillory_out event with data:', actionLog);
      break;
    case 'random_event':
      logger.debug('Handling random_event event with data:', actionLog);
      break;
    case 'tasks_task_assigned':
      logger.debug('Handling tasks_task_assigned event with data:', actionLog);
      break;
    case 'tasks_vote_ended':
      logger.debug('Handling tasks_vote_ended event with data:', actionLog);
      break;
    case 'tasks_task_completed':
      logger.debug('Handling tasks_task_completed event with data:', actionLog);
      break;
    case 'tasks_task_failed':
      logger.debug('Handling tasks_task_failed event with data:', actionLog);
      break;
    case 'temporary_opening_opened':
      logger.debug('Handling temporary_opening_opened event with data:', actionLog);
      break;
    case 'temporary_opening_locked':
      logger.debug('Handling temporary_opening_locked event with data:', actionLog);
      break;
    case 'temporary_opening_locked_late':
      logger.debug('Handling temporary_opening_locked_late event with data:', actionLog);
      break;
    case 'verification_picture_submitted':
      logger.debug('Handling verification_picture_submitted event with data:', actionLog);
      break;
    case 'wheel_of_fortune_turned':
      logger.debug('Handling wheel_of_fortune_turned event with data:', actionLog);
      break;
    default:
      logger.warn(`No handler found for action log type: ${actionLog.type}`);
  }
}

// Funktion zum Verarbeiten von Events
export function handleEvent(event: EventDto) {
  if (event.event === 'extension_session.created') {
    handleLockCreated(event);
  } else if (event.event === 'action_log.created') {
    handleActionLogCreated(event as ActionLogCreated);
  } else {
    logger.warn(`No handler found for event: ${event.event}`);
  }
}



// Funktion zur zufälligen Auswahl einer Aktion basierend auf Gewichtungen
function getRandomAction(actionWeights: DifficultyDto[]): string {
  const totalWeight = actionWeights.reduce((sum, { weight }) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (const { type, weight } of actionWeights) {
    if (random < weight) {
      return type;
    }
    random -= weight;
  }

  throw new Error('No action selected. This should never happen.');
}

async function votesTodayIncrease(sessionId: string): Promise<{success: boolean}> {
  
  logger.debug(`Increasing daily votes for session ${sessionId}`);

  try {
    const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(sessionId, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });
    const session = (response.data as any).session;

    //erhöht die Anzahl der heutigen Votes, der totalen Votes und ggf. der votes die gewertet werden
    if (session.data && session.data.votes) {
      session.data.votes.today++;
      session.data.votes.total++;
      if (session.config?.hardcore && session.data.votes.today < session.config.daily_quota) {
        session.data.votes.eligible++;
      }
    }
    //Prüft ob alle täglichen aktionen erreicht wurden
    if (session.data.votes.today == session.config.daily_quota) {
      session.metadata = {
        reasonsPreventingUnlocking: [],
        homeActions: [],
      };
    } else {
      //verringert die nötigen Aktionen für heute um eins
      session.metadata?.homeActions?.forEach(action => {
        if (typeof action.badge === 'string') {
          let badgeNumber = parseInt(action.badge, 10);
          badgeNumber--;
          action.badge = badgeNumber.toString();
        }
      });
    }

    const patchDto: PatchExtensionSessionDto = {
      config: session.config,
      metadata: session.metadata,
      data: session.data,
    };

    await partnerExtensionsApi.patchExtensionSession(sessionId, patchDto, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });
    logger.debug(`Metadaten erfolgreich aktualisiert für Session ${sessionId}`);
    return { success: true };
  } catch (error: any) {
    logger.error('Fehler beim Aktualisieren der Metadaten:', error.response?.data || error.message);
    throw new Error('Metadaten konnten nicht aktualisiert werden');
  }
}

// Funktion zum Verarbeiten von Link-Vote-Daten
async function handleLinkVote(data) {
  console.log('Handling link_time_changed event with data:', data.data.actionLog);

  const time = data.data.actionLog.payload.duration;
  const username = data.data.actionLog.user ? data.data.actionLog.user.username : 'Visitor';

  const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(data.data.sessionId, {
    headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` }
  });

  const session = (response.data as any).session;
  const action = getRandomAction(session.config.difficulty);
  const multiplier = session.config.punish_mult;

  switch (action) {
    case 'nothing':
      logger.debug('No action taken.');
      await votesTodayIncrease(data.data.sessionId);
      break;
    case 'invert':
      logger.debug('Inverting time for user:', username);
      await votesTodayIncrease(data.data.sessionId);
      await createLogEntry(data.data.sessionId, { title: 'Mouse slip', description: ` ${username} clearly hit the wrong button.` });
      await setTime(data.data.sessionId, -time * 2 * multiplier);
      break;
    case 'double':
      logger.debug('Doubling time for user:', username);
      await votesTodayIncrease(data.data.sessionId);
      await createLogEntry(data.data.sessionId, { title: 'Lucky vote', description: `Critical vote by ${username}. It count's twice!` });
      await setTime(data.data.sessionId, time * 2 * multiplier);
      break;
    case 'double_invert':
      logger.debug('Doubling and inverting time for user:', username);
      await votesTodayIncrease(data.data.sessionId);
      await createLogEntry(data.data.sessionId, { title: 'This doesn\'t look right...', description: `Invalid vote by ${username}. It has been corrected.` });
      await setTime(data.data.sessionId, -time * 3 * multiplier);
      break;
    case 'jackpot':
      logger.debug('Jackpot! Special action for user:', username);
      await votesTodayIncrease(data.data.sessionId);
      await createLogEntry(data.data.sessionId, { title: 'Jackpot!', description: `${username} hit the Jackpot! Vote was multiplied by 10!` });
      await setTime(data.data.sessionId, time * 9 * multiplier);
      break;
    default:
      logger.warn('Unknown action:', action);
  }
}


// Beispiel-Funktionen für verschiedene ActionLogForPublic-Types
async function handleLockCreated(data) {
  logger.debug('Handling locked event for session:', data.data.session.sessionId);

  // Laden der JSON-Datei und Konvertierung in ein JavaScript-Objekt
  let defaultData = defaultConfig.metadata;
  
  try {
    const response: AxiosResponse<GetPartnerSessionRepDto> = await partnerExtensionsApi.getExtensionSession(data.data.session.sessionId, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });
    const session = (response.data as any).session;

    // Setzt die Standard-Quota und die Gründe für das Nicht-Entsperren
    session.metadata = {
      reasonsPreventingUnlocking: defaultData.reasonsPreventingUnlocking,
      homeActions: defaultData.homeActions.map(action => ({
        ...action,
        badge: session.config.daily_quota.toString()
      })),
    };

    const patchDto: PatchExtensionSessionDto = {
      config: session.config,
      metadata: session.metadata,
      data: session.data,
    };

    await partnerExtensionsApi.patchExtensionSession(data.data.session.sessionId, patchDto, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });
    logger.debug(`Metadaten erfolgreich aktualisiert für Session ${data.data.session.sessionId}`);
    return { success: true };
  } catch (error: any) {
    logger.error('Fehler beim Aktualisieren der Metadaten:', error.response?.data || error.message);
    throw new Error('Metadaten konnten nicht aktualisiert werden');
  }
}

