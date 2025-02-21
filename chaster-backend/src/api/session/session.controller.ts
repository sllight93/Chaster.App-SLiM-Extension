import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { getSession, updateSession } from '../../utils/sessionUtils';

@ApiTags('config')
@Controller('api/session')
export class SessionController {
  /**
   * Ruft die aktuelle Konfiguration für die angegebene Session ab.
   * GET /config/:mainToken
   */
  @Get(':mainToken')
  @ApiOperation({ summary: 'Liefert die aktuelle Konfiguration', description: 'Dieses Endpoint gibt die aktuelle Konfiguration der angegebenen Session zurück.' })
  @ApiResponse({
    status: 200,
    description: 'Erfolgreiche Antwort',
    schema: {
      example: {
        success: true,
        config: {
          config: {
            difficulty: [
              { type: "nothin", weight: 320 },
              { type: "double", weight: 25 },
              { type: "invert", weight: 25 },
              { type: "double_invert", weight: 20 },
              { type: "jackpot", weight: 1 },
            ],
            votes_target: 300,
            count_only_loggedin: true,
            split: 50,
            daily_quota: 20,
            punish_mult: 1,
          },
          metadata: { /* beliebige Metadaten */ },
          data: { /* beliebige Daten */ },
        },
      },
    },
  })
  async getSession(@Param('mainToken') mainToken: string): Promise<any> {
    const config = await getSession(mainToken);
    return { success: true, config };
  }

  /**
   * Aktualisiert (merged) die Konfiguration für die angegebene Session.
   * PATCH /config/:mainToken
   * Erwartet im Body ein JSON-Objekt mit den Feldern, die aktualisiert werden sollen.
   * Dabei werden die neuen Werte in die bestehende Konfiguration integriert, wobei vorhandene Felder überschrieben werden.
   */
  @Patch(':mainToken')
  @ApiOperation({ summary: 'Aktualisiert die Konfiguration', description: 'Nur die im Body angegebenen Felder werden in die bestehende Konfiguration integriert. (Shallow-Merge)' })
  @ApiBody({
    description: 'Teilweise Konfigurationsänderungen',
    schema: {
      example: {
        config: {
          votes_target: 350,
        },
        metadata: { updatedKey: 'newValue' },
        data: {},
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Configuration updated successfully' })
  async updateConfig(@Param('mainToken') mainToken: string, @Body() newConfig: any): Promise<any> {
    await updateSession(mainToken, newConfig);
    return { success: true, message: 'Configuration updated successfully' };
  }
}
