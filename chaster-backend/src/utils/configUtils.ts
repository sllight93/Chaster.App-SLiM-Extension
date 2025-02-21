import { PartnerExtensionsApi, PartnerConfigurationForPublic, UpdatePartnerConfigurationDto } from '@chasterapp/chaster-js';
import { AxiosResponse } from 'axios';
import { getSessionAuthData } from './sessionUtils';
import { ConfigDto } from '../schema/config.dto';
import { Logger } from '@nestjs/common';

const partnerExtensionsApi = new PartnerExtensionsApi();
const logger = new Logger('ConfigUtil');

export async function getConfig(token: string, options?: any): Promise<ConfigDto> {
  logger.debug(`Rufe Konfiguration für Token ${token} ab.`);
  const apiToken = process.env.CHASTER_API_TOKEN;
  const authOptions = {
    headers: { Authorization: `Bearer ${apiToken}` },
    ...options,
  };

  try {
    const response: AxiosResponse<PartnerConfigurationForPublic> = await partnerExtensionsApi.getConfiguration(
      token,
      authOptions
    );
    logger.debug(`Erhaltene Config: ${JSON.stringify(response.data)}`);
    return response.data.config as ConfigDto;
  } catch (error: any) {
    logger.error(`Fehler beim Abrufen der Konfiguration für Token ${token}: ${error.message}`);
    throw new Error(`Fehler beim Abrufen der Konfiguration: ${error.message}`);
  }
}

export async function setConfig(
  token: string,
  updatePartnerConfigurationDto: UpdatePartnerConfigurationDto,
  options?: any
): Promise<{ success: boolean }> {
  logger.debug(`Setze Konfiguration für Token ${token} ab.`);
  logger.debug(`Erhaltene Konfiguration: ${JSON.stringify(updatePartnerConfigurationDto)}`);

  // Entferne den Schlüssel token, falls vorhanden
  const  configWithoutToken  = {config: updatePartnerConfigurationDto.config};

  const apiToken = process.env.CHASTER_API_TOKEN;
  const authOptions = {
    headers: { Authorization: `Bearer ${apiToken}` },
    ...options,
  };

  try {
    await partnerExtensionsApi.updateConfiguration(token, configWithoutToken, authOptions);
    logger.debug(`Konfiguration erfolgreich aktualisiert für Token ${token}.`);
    return { success: true };
  } catch (error: any) {
    logger.error(`Fehler beim Aktualisieren der Konfiguration für Token ${token}: ${error.message}`);
    throw new Error(`Fehler beim Speichern der Konfiguration: ${error.message}`);
  }
}

