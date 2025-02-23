import { Module } from '@nestjs/common';
import { WebhooksModule } from './api/webhooks/webhooks.module';
import { ConfigModule } from './api/config/config.module';
import { SessionModule } from './api/session/session.module';
import { CronModule } from './modules/cron.module';



@Module({
  imports: [ 
    WebhooksModule,
    ConfigModule,
    SessionModule,
    CronModule
  ],
  controllers: [
  ],
  providers: [ 
  ],
  exports: [],
})

export class AppModule {}
