import React from "react";
import { PrivateSessionDto } from '../schemas/config.dto';

interface DataProps {
  extData: PrivateSessionDto;
}

export default function ExtensionMain({ extData }: DataProps) {
  const votesToday = extData.data.votes.today;
  const dailyQuota = extData.config.daily_quota;
  const progressPercentage = Math.round((votesToday / dailyQuota) * 100);
  const linkUrl = "https://chaster.app/sharelink/abc123";

  return (
    <div>
      {/* Fortschrittstext oberhalb der Leiste */}
      <div className="progress-text">
        {votesToday} / {dailyQuota}
      </div>
      
      {/* Fortschrittsleiste */}
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={votesToday}
          aria-valuemin={0}
          aria-valuemax={dailyQuota}
        ></div>
      </div>

        <hr></hr>

      {/* Link im Stil eines Input-Textfeldes – klick zum Kopieren */}
      <input 
        type="text"
        className="form-control clickable-copy"
        value={linkUrl}
        readOnly
        onClick={() => {
          navigator.clipboard.writeText(linkUrl);
        }}
      />
    </div>
  );
}