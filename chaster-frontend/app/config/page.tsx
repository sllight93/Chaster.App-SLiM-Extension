'use client';

import { useState, useEffect, useCallback } from 'react';
import useToken from "../hooks/useToken";
import { useConfig } from "../hooks/useConfig";
import { ConfigDto } from "../schemas/config.dto";
import ExtensionConfig from "./extensionConfig";
import { defaultConfig } from "./extensionConfig";


export default function ConfigPage() {
  // Informiere das Chaster-Modal, dass Save unterstützt wird.
  useEffect(() => {
    window.parent.postMessage(
      JSON.stringify({
        type: "partner_configuration",
        event: "capabilities",
        payload: { features: { save: true } },
      }),
      "*"
    );
  }, []);

  const token = useToken();
  const { loadConfig, saveConfig } = useConfig(token!);
  // Arbeite in page.tsx ausschließlich mit dem gesamten Config-Objekt.
  const [config, setConfig] = useState<ConfigDto>(defaultConfig);

  // Lade vorhandene Konfiguration und setze das Config-Objekt.
  useEffect(() => {
    if (!token) return;
    loadConfig()
      .then((configData) => {
        if (configData) {
          setConfig(configData);
        }
      })
      .catch((err) => {
        console.error("Konfiguration konnte nicht geladen werden:", err.message);
      });
  }, [token, loadConfig]);

  // Handler, der von der UI-Komponente aufgerufen wird, wenn sich die Config ändert.
  const handleConfigChange = useCallback((newConfig: ConfigDto) => {
    setConfig(newConfig);
  }, []);

  // Message-Handler zum Speichern der Konfiguration.
  useEffect(() => {
    const messageHandler = async (e: MessageEvent) => {
      // Versuche zuerst, e.data als JSON zu parsen
      let parsedData: any;
      try {
        parsedData = JSON.parse(e.data);
      } catch (error) {
        // Falls das Parsen fehlschlägt, ignoriere diese Nachricht
        return;
      }
      // Prüfe, ob das geparste Objekt die erwarteten Schlüssel enthält
      if (
        parsedData &&
        typeof parsedData === 'object' &&
        parsedData.type === 'chaster' &&
        parsedData.event === 'partner_configuration_save'
      ) {
        window.parent.postMessage(
          JSON.stringify({ type: 'partner_configuration', event: 'save_loading' }),
          '*'
        );

        if (token) {
          await saveConfig(token, config);
        } else {
          console.error('Token is null');
        }
        window.parent.postMessage(
          JSON.stringify({
            type: 'partner_configuration',
            event: 'save_success',
          }),
          '*'
        );
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [config, token, saveConfig]);

  return (
    <main
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-large)',
        maxWidth: '800px',
        margin: '1rem auto',
        color: 'var(--color-text)',
      }}
    >
      {/* Übergib das gesamte Config-Objekt an die UI-Komponente */}
      <ExtensionConfig config={config} onChange={handleConfigChange} />
      <hr />
    </main>
  );
}