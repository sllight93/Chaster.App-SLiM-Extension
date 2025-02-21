import { Controller, Post, Body, Headers, Logger, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { handleEvent } from '../../utils/eventUtils';
import { EventDto } from '../../schema/config.dto';

@ApiTags('webhooks')
@Controller('api/webhooks')
//@UseGuards(BasicAuthGuard)
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  @Post()
  @ApiOperation({
    summary: 'Empfang eines Webhooks',
    description: `Empfängt Webhook-Anfragen von Chaster Erweiterungen, protokolliert die Header und die Payload und gibt eine Empfangsbestätigung zurück.
    Weitere Informationen findest du in der Chaster-Dokumentation: https://docs.chaster.app/api/extensions-api/create-your-extension/webhooks`
  })
  @ApiBody({
    description: 'Webhook-Payload. Erwartet werden mindestens die Felder "event" und "data".',
    schema: {
      example: {
        event: 'something_happened',
        data: { key: 'value' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook erfolgreich empfangen',
    schema: {
      example: { status: 'received' }
    }
  })
  handleWebhook(
    @Body() payload: any,
    @Headers() headers: Record<string, any>
  ) {
    this.logger.log(`Webhook received with headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Payload: ${JSON.stringify(payload)}`);
    
    // Verarbeite das Event
    handleEvent(payload);

    return { status: 'received' };
  }
}
