  /**
   * DTO für die Initial Konfiguration.
   *
   * Dieses Interface definiert ausschließlich die Konfigurationseinstellungen,
   * die das System zwingend benötigt. Es enthält weder zusätzliche Sperrinformationen (lock)
   * noch Metadaten oder weitere Daten.
   */
  export interface ConfigDto {
    /**
     * Konfigurationseinstellungen.
     */
    
      /**
       * Eine Liste von Difficulty-Objekten, die die Schwierigkeit definieren.
       */
      difficulty: DifficultyDto[];
      /**
       * Zielwert der Stimmen.
       */
      votes_target: number;
      /**
       * Gibt an, ob nur für eingeloggte Benutzer gezählt wird.
       */
      count_only_loggedin: boolean;
      /**
       * Anteil der Verteilung.
       */
      split: number;
      /**
       * Tägliches Kontingent.
       */
      daily_quota: number;
      /**
       * Strafmultiplikator.
       */
      punish_mult: number;
    
  }
  
  export interface MetadataDto {
    /**
     * Konfigurationseinstellungen.
     */
    
      /**
       * Gründe, die ein Unlock verhindern.
       */
      reasonsPreventingUnlocking: string[];
      /**
       * Eine Liste von Aktionen, die auf der Homepage angezeigt werden können.
       */
      homeActions: HomeActionsDto[];
    
  }
  
  export interface HomeActionsDto {
  
  
    /**
     * Eindeutiger Identifikator der Aktion.
     */
    slug: string;
    /**
     * Titel der Aktion.
     */
    title: string;
    /**
     * Beschreibung der Aktion.
     */
    description: string;
    /**
     * Icon zur Darstellung der Aktion.
     */
    icon: string;
    /**
     * Optionales Badge zur Hervorhebung.
     */
    badge?: string;
  
  }
  
  export interface DataDto {
      
        votes: {
          total: number;
          eligible: number;
          today: number;
        };   
      
  }
    
  export interface DifficultyDto {
    type: string;
    weight: number;
  }
  
