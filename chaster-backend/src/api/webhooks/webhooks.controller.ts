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
    summary: 'Receive a webhook',
    description: `Receives webhook requests from Chaster extensions, logs the headers and payload, and returns an acknowledgment.
    For more information, please refer to the Chaster documentation: https://docs.chaster.app/api/extensions-api/create-your-extension/webhooks`
  })
  @ApiBody({
    description: 'Webhook payload. At a minimum, the "event" and "data" fields are expected.',
    schema: {
      example: {
        event: 'something_happened',
        data: { key: 'value' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook received successfully',
    schema: {
      example: { status: 'received' }
    }
  })
  handleWebhook(
    @Body() payload: any,
    @Headers() headers: Record<string, any>
  ) {
    this.logger.log(`Event type '${JSON.stringify(payload.data.actionLog.type)}' has been triggered with title: ${JSON.stringify(payload.data.actionLog.title)}`);
    
    // Process the event
    handleEvent(payload);

    return { status: 'received' };
  }
}
