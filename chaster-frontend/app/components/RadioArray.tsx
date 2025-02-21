import React from 'react';
import './RadioArray.sass';

export interface RadioArrayProps {
  label: string;
  options: string[];
  selected: string;
  name: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function RadioArray({
  label,
  options,
  selected,
  name,
  onChange,
  onBlur,
}: RadioArrayProps) {
  return (
    <div className="radio-array-container">
      <label className="radio-array-label">{label}</label>
      <div className="radio-array-options">
        {options.map(option => (
          <label key={option} className="radio-array-option">
            <input
              type="radio"
              name={name}
              value={option}
              className="radio-array-input"
              checked={selected === option}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}