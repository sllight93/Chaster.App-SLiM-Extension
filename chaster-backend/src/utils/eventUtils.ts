import { EventDto } from '../schema/config.dto';
import { ActionLogCreated, ActionLogCreatedEventEnum, ActionLogForPublic } from '@chasterapp/chaster-js/dist/api';

// Beispiel-Funktionen für verschiedene ActionLogForPublic-Types
function handleLocked(data: ActionLogForPublic) {
  console.log('Handling locked event with data:', data);
  // Füge hier die Logik für das Event hinzu
}

function handleUnlocked(data: ActionLogForPublic) {
  console.log('Handling unlocked event with data:', data);
  // Füge hier die Logik für das Event hinzu
}

// Weitere Handler-Funktionen für die anderen ActionLogForPublic-Types
// ...

// Funktion zum Verarbeiten von ActionLogForPublic-Events
function handleActionLogCreated(data: ActionLogCreated) {
  if (!data || !data.data || !data.data.actionLog) {
    console.error('Invalid data structure for ActionLogCreated:', data);
    return;
  }

  const actionLog = data.data.actionLog;
  switch (actionLog.type) {
    case 'locked':
      handleLocked(actionLog);
      break;
    case 'unlocked':
      handleUnlocked(actionLog);
      break;
    // Weitere Cases für die anderen ActionLogForPublic-Types
    case 'deserted':
      console.log('Handling deserted event with data:', actionLog);
      break;
    case 'timer_hidden':
      console.log('Handling timer_hidden event with data:', actionLog);
      break;
    case 'timer_revealed':
      console.log('Handling timer_revealed event with data:', actionLog);
      break;
    case 'time_logs_hidden':
      console.log('Handling time_logs_hidden event with data:', actionLog);
      break;
    case 'time_logs_revealed':
      console.log('Handling time_logs_revealed event with data:', actionLog);
      break;
    case 'time_changed':
      console.log('Handling time_changed event with data:', actionLog);
      break;
    case 'locktober_points_changed':
      console.log('Handling locktober_points_changed event with data:', actionLog);
      break;
    case 'combination_verified':
      console.log('Handling combination_verified event with data:', actionLog);
      break;
    case 'combination_failed':
      console.log('Handling combination_failed event with data:', actionLog);
      break;
    case 'lock_frozen':
      console.log('Handling lock_frozen event with data:', actionLog);
      break;
    case 'lock_unfrozen':
      console.log('Handling lock_unfrozen event with data:', actionLog);
      break;
    case 'session_offer_accepted':
      console.log('Handling session_offer_accepted event with data:', actionLog);
      break;
    case 'max_limit_date_increased':
      console.log('Handling max_limit_date_increased event with data:', actionLog);
      break;
    case 'max_limit_date_removed':
      console.log('Handling max_limit_date_removed event with data:', actionLog);
      break;
    case 'keyholder_trusted':
      console.log('Handling keyholder_trusted event with data:', actionLog);
      break;
    case 'link_time_changed':
      console.log('Handling link_time_changed event with data:', actionLog);
      break;
    case 'dice_rolled':
      console.log('Handling dice_rolled event with data:', actionLog);
      break;
    case 'timer_guessed':
      console.log('Handling timer_guessed event with data:', actionLog);
      break;
    case 'pillory_in':
      console.log('Handling pillory_in event with data:', actionLog);
      break;
    case 'pillory_out':
      console.log('Handling pillory_out event with data:', actionLog);
      break;
    case 'random_event':
      console.log('Handling random_event event with data:', actionLog);
      break;
    case 'tasks_task_assigned':
      console.log('Handling tasks_task_assigned event with data:', actionLog);
      break;
    case 'tasks_vote_ended':
      console.log('Handling tasks_vote_ended event with data:', actionLog);
      break;
    case 'tasks_task_completed':
      console.log('Handling tasks_task_completed event with data:', actionLog);
      break;
    case 'tasks_task_failed':
      console.log('Handling tasks_task_failed event with data:', actionLog);
      break;
    case 'temporary_opening_opened':
      console.log('Handling temporary_opening_opened event with data:', actionLog);
      break;
    case 'temporary_opening_locked':
      console.log('Handling temporary_opening_locked event with data:', actionLog);
      break;
    case 'temporary_opening_locked_late':
      console.log('Handling temporary_opening_locked_late event with data:', actionLog);
      break;
    case 'verification_picture_submitted':
      console.log('Handling verification_picture_submitted event with data:', actionLog);
      break;
    case 'wheel_of_fortune_turned':
      console.log('Handling wheel_of_fortune_turned event with data:', actionLog);
      break;
    default:
      console.warn(`No handler found for action log type: ${actionLog.type}`);
  }
}

// Funktion zum Verarbeiten von Events
export function handleEvent(event: EventDto) {
  if (event.event === 'action_log.created') {
    handleActionLogCreated(event as ActionLogCreated);
  } else {
    console.warn(`No handler found for event: ${event.event}`);
  }
}

function handleLinkVote(event) {

    const time = event.data.actionLog.payload.duration;
    const username = event.data.actionLog.user.username;

}



