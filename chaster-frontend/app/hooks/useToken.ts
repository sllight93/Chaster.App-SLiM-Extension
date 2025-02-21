import { useEffect, useState } from "react";

export default function useToken(): string | null {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const parsed = JSON.parse(decodeURIComponent(hash));
        const extractedToken = parsed.mainToken;
        const configurationToken = parsed.partnerConfigurationToken;
        setToken(extractedToken || configurationToken);

      } catch (error) {
        console.error("Error storing token:", error);
      }
    }
  }, []);

  return token;
}
