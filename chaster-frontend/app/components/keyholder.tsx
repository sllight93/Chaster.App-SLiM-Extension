import React from "react";
import "./UserCard.sass";

interface KeyholderProps {
  name: string;
  avatarUrl: string;
}

export default function Keyholder({ name, avatarUrl }: KeyholderProps) {
  return (
    <div className="user-container">
      <span className="user-label">Keyholder</span>
      <div className="user-cell">
        <img src={avatarUrl} alt="Avatar" className="avatar-img" />
        <div className="user-name">{name}</div>
      </div>
    </div>
  );
}