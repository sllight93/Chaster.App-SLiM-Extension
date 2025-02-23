import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { checkAndResetDailyVotes } from '../utils/cronUtils'; // Adjust the path as needed

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  // Executes checkAndResetDailyVotes daily at midnight (00:00)
  @Cron('0 0 * * *')
  async handleDailyVotesReset() {
    this.logger.debug('Executing daily check and reset of votes.');
    await checkAndResetDailyVotes();
  }
}