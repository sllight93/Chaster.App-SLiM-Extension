"use client";

import React from "react";
import "./LoadingSpinner.sass";

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner-content">
        <svg
          className="spinner-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    </div>
  );
}