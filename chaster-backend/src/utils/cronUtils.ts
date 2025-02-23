import axios, { AxiosResponse } from 'axios';
import { Logger } from '@nestjs/common';

import { setTime } from './lockUtils';

import { 
  PartnerExtensionsApi, 
  ExtensionSessionForPartner, 
  PatchExtensionSessionDto,
  PartnerMetadata,
} from '@chasterapp/chaster-js';
import {  
  ConfigDto,
  DataDto, 
  MetadataDto
} from '../schema/extensionConfig.dto';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('CronUtils');

// Define an interface for the sessions search response
interface SessionsSearchResponse {
  results: ExtensionSessionForPartner[];
}

export async function checkAndResetDailyVotes(options?: any) {
  logger.debug('Searching for running locks...');

    /**
    // API call for sessionData
    const response: AxiosResponse<PartnerExtensionForDashboard[], any> = await partnerExtensionsApi.findAll({
        headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
        extensionSlug: "shared-link-modifier",
    });
    */

  // Define the API endpoint and payload for searching locked sessions
  const endpoint = 'https://api.chaster.app/api/extensions/sessions/search';
  const payload = {
    status: "locked",
    extensionSlug: "shared-links-modifier"
  };

  // Call the API directly using axios.post and expect an object with results
  const response: AxiosResponse<SessionsSearchResponse> = await axios.post(endpoint, payload, {
    headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
  });
  
  // Use the array from the results property
  const results = response.data.results;

  // Iterate over all sessions in the results array and process each session
  for (const session of results) {
    const sessionObj = session as ExtensionSessionForPartner;
    const config = sessionObj.config as ConfigDto;
    let metadata = sessionObj.metadata as MetadataDto;
    let data = sessionObj.data as DataDto;
    
    // Check if user has reached the daily quota
    if (data.votes.today < config.daily_quota) {
      // Calculate missing votes
      const missingVotes = config.daily_quota - data.votes.today;
      
      // Compute penalty time in hours and convert to seconds (1 hour = 3600 seconds)
      const penaltyHours = missingVotes * config.punish_mult;
      const penaltySeconds = penaltyHours * 3600;
      
      // Log penalty details
      logger.debug(`Daily quota not reached for session ${sessionObj.sessionId}: ${data.votes.today} of ${config.daily_quota}. Adding penalty time: ${penaltySeconds} seconds.`);
      
      // Add penalty time using setTime (which expects seconds as input)
      await setTime(sessionObj.sessionId, penaltySeconds);
    }
    
    // Reset daily votes in all cases
    data.votes.today = 0;
    
    // Rebuild metadata to match the MetadataDto schema (removing unwanted properties)
    const cleanMetadata: MetadataDto = {
        reasonsPreventingUnlocking: (metadata && metadata.reasonsPreventingUnlocking) || [],
        homeActions: (metadata && metadata.homeActions) || []
      };

      
    const patchDto: PatchExtensionSessionDto = {
      config: config,
      metadata: cleanMetadata,
      data: data,
    };
    
    await partnerExtensionsApi.patchExtensionSession(sessionObj.sessionId, patchDto, {
      headers: { Authorization: `Bearer ${process.env.CHASTER_API_KEY}` },
    });
  }
}