import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { getSession, updateSession } from '../../utils/sessionUtils';

@ApiTags('config')
@Controller('api/session')
export class SessionController {
  /**
   * Retrieves the current configuration for the specified session.
   * GET /api/session/:mainToken
   */
  @Get(':mainToken')
  @ApiOperation({ 
    summary: 'Retrieve the current configuration', 
    description: 'This endpoint returns the current configuration of the specified session.' 
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
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
          metadata: { /* arbitrary metadata */ },
          data: { /* arbitrary data */ },
        },
      },
    },
  })
  async getSession(@Param('mainToken') mainToken: string): Promise<any> {
    const config = await getSession(mainToken);
    return { success: true, config };
  }

  /**
   * Updates (merges) the configuration for the specified session.
   * PATCH /api/session/:mainToken
   * Expects a JSON object in the body with the fields to be updated.
   * The new values are merged into the existing configuration, overwriting existing fields.
   */
  @Patch(':mainToken')
  @ApiOperation({ 
    summary: 'Update the configuration', 
    description: 'Only the fields provided in the request body will be merged into the existing configuration. (Shallow merge)' 
  })
  @ApiBody({
    description: 'Partial configuration update',
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

