import { Controller, Get, Put, Param, Body, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getConfig, setConfig } from '../../utils/configUtils';
import { ConfigDto } from '../../schema/config.dto';

interface NestedConfigDto {
  config: ConfigDto;
}

@ApiTags('config')
@Controller('api/config')
export class ConfigController {
  private readonly logger = new Logger(ConfigController.name);

  /**
   * Ruft die aktuelle Konfiguration für die angegebene Session ab.
   * GET /config/:configToken
   */
  @Get(':configToken')
  async getConfig(@Param('configToken') configToken: string): Promise<any> {
    this.logger.debug(`GET config for token: ${configToken}`);
    const config = await getConfig(configToken);
    this.logger.debug(`Retrieved config: ${JSON.stringify(config)}`);
    return { success: true, config };
  }

  /**
   * Aktualisiert die Konfiguration für die angegebene Session.
   * PUT /config/:configToken
   */
  @Put(':configToken')
  async setConfig(@Param('configToken') configToken: string, @Body() config: NestedConfigDto): Promise<any> {
    this.logger.debug(`PUT config for token: ${configToken}`);
    this.logger.debug(`Incoming config payload: ${JSON.stringify(config)}`);
    const res = await setConfig(configToken, config);
    this.logger.debug(`Update result: ${JSON.stringify(res)}`);
    return { success: true, res };
  }
}