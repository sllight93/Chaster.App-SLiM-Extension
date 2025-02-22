import { ConfigDto, MetadataDto, DataDto, DifficultyDto } from './extensionConfig.dto';

/**
 * DTO für die Konfiguration.
 * Diese Schnittstelle definiert die Struktur der Konfiguration, die vom System erwartet wird.
 */
export interface PrivateSessionDto {
    /**
     * Konfigurationseinstellungen.
     */
    config: ConfigDto;
    /**
     * Metadaten zur Konfiguration.
     */
    metadata: MetadataDto;
    /**
     * Daten, die zusätzlich zur Konfiguration gespeichert werden.
     */
    data: DataDto;
    lock: LockDto;
  }
/**
 * DTO für die Aktualisierung der Konfiguration.
 * Alle Felder sind optional, sodass nur Teilwerte übermittelt werden können.
 */
export type UpdatePrivateSessionDto = Partial<Omit<PrivateSessionDto, "lock">>;

export { ConfigDto, MetadataDto, DataDto, DifficultyDto } from './extensionConfig.dto';

export interface LockDto {
    
    keyholder: UserDto;
    user: UserDto;
    _id: string;
    status: string;
    canBeUnlocked: boolean;
    totalDuration: number;
    hideTimeLogs: boolean;
    isAllowedToViewTimeLogs: boolean;
    isFrozen: boolean;
    frozenAt?: Date;
    startDate: Date;
    endDate: Date;
    displayRemainingTime: boolean;
    title: string;
    lastVerificationPicture?: string;
    extensionAllowUnlocking: boolean;
  
}

export interface UserDto {
  username: string;
  avatarUrl: string;
  online?: boolean;
}

export interface ConfigApiResponseDto {
  
    config: ConfigDto,
    role: string,
    user: string,
    sessionId?: string,
    extensionSlug: string,
    createdAt: Date
  
}

/**
 * DTO für ein Event.
 * Diese Schnittstelle definiert die Struktur eines Events, das vom System erwartet wird.
 */
export interface EventDto {
  /**
   * Der Name des Events.
   */
  event: string;
  sentAt: string;
  requestId: string;
  /**
   * Die Daten, die mit dem Event übermittelt werden.
   */
  data: Record<string, any>;
}
