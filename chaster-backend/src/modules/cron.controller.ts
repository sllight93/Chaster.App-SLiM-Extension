import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CronService } from './cron.service';

@ApiTags('debug')
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  // Endpoint to manually trigger the daily votes reset for testing purposes
  @Get('reset-daily-votes')
  @ApiOperation({ summary: 'Manually triggers the daily votes reset' })
  async resetDailyVotes() {
    await this.cronService.handleDailyVotesReset();
    return { message: 'Daily votes reset executed' };
  }
}