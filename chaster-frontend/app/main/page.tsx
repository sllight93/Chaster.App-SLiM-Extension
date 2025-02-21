"use client";

import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import { useSession } from "../hooks/useSession";
import { PrivateSessionDto } from "../schemas/config.dto";

import Countdown from "../components/Countdown";
import Keyholder from "../components/Keyholder";
import LoadingSpinner from "../components/LoadingSpinner";
import ExtensionMain from "./extensionMain";



export default function MainPage() {
  const token = useToken();
  const { loadSession } = useSession(token!);
  const [data, setData] = useState<PrivateSessionDto>();


  function formatDuration(ms: number): string {
    const hours = ms / (1000 * 60 * 60);
    if (hours < 24) {
      return `${Math.round(hours)} hours`;
    } else {
      const days = hours / 24;
      return `${Math.round(days)} days`;
    }
  }

  useEffect(() => {
    if (!token) return;
    loadSession().then((sessionData) => {
      if (sessionData) {
        setData(sessionData as PrivateSessionDto);
      } else {
        console.error("Geladene Konfiguration entspricht nicht dem erwarteten Schema.", sessionData);
      }
    });
  }, [token, loadSession]);

  // Warte, bis data geladen ist bevor der Hauptinhalt gerendert wird.
  if (!data) {
    return (
      <div
        style={{
          padding: "1rem",
          borderRadius: "var(--radius-large)",
          backgroundColor: "var(--color-bg)",
          maxWidth: "800px",
          margin: "1rem auto",
          color: "var(--color-text)",
          textAlign: "center",
        }}
      >
        <LoadingSpinner/>
      </div>
    );
  }

  return (
    <main
      style={{
        padding: "1rem",
        borderRadius: "var(--radius-large)",
        maxWidth: "800px",
        margin: "1rem auto",
        color: "var(--color-text)",
      }}
    >
      <div className="layout-container"> 
        {/* Linke, schmalere Spalte */}
        <div className="layout-left">
          <div className="card card-countdown">
            <div>
              <div className="card-header">
                <span className="h2">
                  Keyholder lock <i className="fas fa-flask"></i>
                </span>
                <div className="caption mb-3">Locked for { formatDuration(data.lock.totalDuration) }</div>
              </div>
              <div className="card-body card-body-grid">
                <Countdown targetDate={ data.lock.endDate }  />
              </div>
            </div>
            <Keyholder 
              name={data.lock.keyholder.username} 
              avatarUrl={data.lock.keyholder.avatarUrl} 
            />
          </div>
        </div>
        
        {/* Rechte, breitere Spalte */}
        <div className="layout-right">
          <div className="card">
            <div>
              <div className="card-header">
                <span className="h2">
                  Shared Links Modifier <i className="fas fa-flask"></i>
                </span>
                <div className="caption mb-3">You have 12 pending actions required until tomorrow.</div>
              </div>
              <div className="card-body">
                <ExtensionMain extData={data as PrivateSessionDto} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


