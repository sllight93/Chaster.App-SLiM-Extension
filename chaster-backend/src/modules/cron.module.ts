import { Module } from '@nestjs/common';
import { CronService } from '../modules/cron.service';
import { CronController } from './cron.controller';

@Module({
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}