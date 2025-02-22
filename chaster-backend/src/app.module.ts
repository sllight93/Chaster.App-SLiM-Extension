import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksModule } from './api/webhooks/webhooks.module';
import { ConfigModule } from './api/config/config.module';
import { SessionModule } from './api/session/session.module';

import { DebugModule } from './api/debug/debug.module';


@Module({
  imports: [ 
    WebhooksModule,
    ConfigModule,
    SessionModule,
    DebugModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService, 
  ],
  exports: [],
})

export class AppModule {}
