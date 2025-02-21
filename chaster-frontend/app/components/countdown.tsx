import React, { useState, useEffect } from "react";
import './Countdown.sass';

interface CountdownProps {
  targetDate: Date; // Das Zieldatum, bis zu dem heruntergezählt werden soll
  isFrozen?: boolean;
}

// Formatiere die Sekunden in [DD, HH, MM, SS] als jeweils zweistellige Strings
function formatSeconds(seconds: number): [string, string, string, string] {
  const dd = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hh = Math.floor(seconds / 3600);
  seconds %= 3600;
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  // Führende Nullen auffüllen
  const pad = (n: number) => n.toString().padStart(2, "0");
  return [pad(dd), pad(hh), pad(mm), pad(ss)];
}

export default function Countdown({ targetDate, isFrozen = false }: CountdownProps) {
  // Berechne die anfängliche verbleibende Zeit in Sekunden
  const calculateRemaining = () => {
    const now = Date.now();
    const difference = new Date(targetDate).getTime() - now;
    return Math.max(Math.floor(difference / 1000), 0);
  };

  const [remaining, setRemaining] = useState<number>(calculateRemaining());

  useEffect(() => {
    if (isFrozen) return; // Wenn gesperrt, starte keinen Timer
    const interval = setInterval(() => {
      const newRemaining = calculateRemaining();
      setRemaining(newRemaining);
      if (newRemaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isFrozen]);

  const [d, h, m, s] = formatSeconds(remaining);
  const parts = [d, h, m, s];
  const labels = ["days", "hours", "mins", "secs"];

  return (
    <div className="countdown-timer d-flex align-items-center justify-content-center">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <div className="countdown-item">
            <div className="countdown-digits">
              {part.split("").map((digit, i) => (
                <div key={i} className="countdown-digit">
                  {digit}
                </div>
              ))}
            </div>
            <div className="countdown-label-item">{labels[index]}</div>
          </div>
          {index < parts.length - 1 && (
            <div className="countdown-sep">:</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}