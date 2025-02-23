import { Controller, Get, Put, Param, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
   * Retrieves the current configuration for the specified session.
   * GET /api/config/:configToken
   */
  @Get(':configToken')
  @ApiOperation({ summary: 'Retrieve configuration for a given session token' })
  @ApiResponse({ status: 200, description: 'Configuration retrieved successfully.' })
  async getConfig(@Param('configToken') configToken: string): Promise<any> {
    this.logger.debug(`GET config for token: ${configToken}`);
    const config = await getConfig(configToken);
    this.logger.debug(`Retrieved config: ${JSON.stringify(config)}`);
    return { success: true, config };
  }

  /**
   * Updates the configuration for the specified session.
   * PUT /api/config/:configToken
   */
  @Put(':configToken')
  @ApiOperation({ summary: 'Update configuration for a given session token' })
  @ApiResponse({ status: 200, description: 'Configuration updated successfully.' })
  async setConfig(@Param('configToken') configToken: string, @Body() config: NestedConfigDto): Promise<any> {
    this.logger.debug(`PUT config for token: ${configToken}`);
    this.logger.debug(`Incoming config payload: ${JSON.stringify(config)}`);
    const res = await setConfig(configToken, config);
    this.logger.debug(`Update result: ${JSON.stringify(res)}`);
    return { success: true, res };
  }
}