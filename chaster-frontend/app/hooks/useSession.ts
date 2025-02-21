import { useState, useCallback, useEffect } from 'react';
import { PrivateSessionDto, UpdatePrivateSessionDto } from '../schemas/config.dto';

export function useSession(token: string) {
  const [session, setSession] = useState<UpdatePrivateSessionDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSession = useCallback(async (): Promise<PrivateSessionDto | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session/${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Wir erwarten, dass data.config vorliegt
      setSession(data.config);
      return data.config; 
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  async function saveSession(newConfig: UpdatePrivateSessionDto) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...newConfig }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // Nach dem Speichern laden wir die aktuelle Konfiguration neu
      await loadSession();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  // Lade die Konfiguration, sobald der Token verfügbar ist
  useEffect(() => {
    if (token) {
      loadSession();
    }
  }, [token]);

  return { session, loading, error, loadSession, saveSession};
}
