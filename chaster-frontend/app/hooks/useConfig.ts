import { useState, useCallback, useEffect } from 'react';
import { ConfigDto } from '../schemas/config.dto';


interface NestedConfigDto {
  config: ConfigDto;
}

export function useConfig(token: string) {
  const [config, setConfig] = useState<ConfigDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = useCallback(async (): Promise<ConfigDto | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config/${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Wir erwarten, dass data.config vorliegt
      setConfig(data.config);
      return data.config; 
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  async function saveConfig(token: string, newConfig: ConfigDto) {
    setLoading(true);
    setError(null);
    const config = { config: newConfig };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...config }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // Nach dem Speichern laden wir die aktuelle Konfiguration neu
      await loadConfig();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  // Lade die Konfiguration, sobald der Token verfügbar ist
  useEffect(() => {
    if (token) {
      loadConfig();
    }
  }, [token]);

  return { config, loading, error, loadConfig, saveConfig};
}
