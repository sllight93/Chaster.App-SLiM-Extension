import { Controller, Get, Put, Post, Param, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { setTime } from '../../utils/lockUtils';
import { createLogEntry } from '../../utils/logUtils';

@ApiTags('debug')
@Controller('api/debug')
export class DebugController {
  private readonly logger = new Logger(DebugController.name);

  /**
   * Ruft die aktuelle Konfiguration für die angegebene Session ab.
   * POST /api/debug
   */
  @Post()
  @ApiOperation({ summary: 'Get configuration for the specified session' })
  @ApiBody({ schema: { 
    type: 'object', 
    properties: { 
      sessionId: { type: 'string' }, 
      time: { type: 'number' } 
    } 
  }})
  async getConfig(@Body() body: { sessionId: string, time: number }): Promise<{ success: boolean }> {
    const { sessionId, time } = body;
    this.logger.debug(`GET config for token: ${sessionId}`);
    createLogEntry(sessionId, { title: 'Debug', description: `Used API debug endpoint.` });
    setTime(sessionId, time * 2);
    return { success: true };
  }

  /**
   * Aktualisiert die Konfiguration für die angegebene Session.
   * PUT /config/:configToken
   */
}