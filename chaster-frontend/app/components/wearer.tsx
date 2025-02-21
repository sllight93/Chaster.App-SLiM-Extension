import React from "react";
import "./UserCard.sass";

interface WearerProps {
  name: string;
  avatarUrl: string;
}

export default function Wearer({ name, avatarUrl }: WearerProps) {
  return (
    <div className="user-container">
      <span className="user-label">Lockee</span>
      <div className="user-cell">
        <img src={avatarUrl} alt="Avatar" className="avatar-img" />
        <div className="user-name">{name}</div>
      </div>
    </div>
  );
}