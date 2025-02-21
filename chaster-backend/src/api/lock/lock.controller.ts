// src/api/incement.controller.ts

import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PartnerExtensionsApi } from '@chasterapp/chaster-js';
import { createLogEntry } from '../../utils/logUtils';
import * as lock from '../../utils/lockUtils';

const partnerExtensionsApi = new PartnerExtensionsApi();

@ApiTags('lock')
@Controller('api/lock')
export class LockController {
  @Post('togglefreeze')
  @ApiOperation({ summary: 'Wechselt den Freeze-Zustand', description: 'Wechselt zwischen eingefrorenem und aufgetautem Zustand des Locks.' })
  @ApiBody({
    description: 'Request-Body muss das Feld "token" enthalten',
    schema: { example: { token: 'sessionToken123' } },
  })
  @ApiResponse({ status: 200, description: 'Lock Freeze-Zustand erfolgreich gewechselt' })
  async toggleFreezeLock(@Body('token') token: string): Promise<any> { 
    return lock.toggleFreezeLock(token); 
  }

  
}
