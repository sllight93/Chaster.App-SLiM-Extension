import React, { useEffect, useRef } from 'react';
import './Slider.sass';
import HelpTooltip from "./HelpTooltip";

export interface SliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (newValue: number) => void;
  onBlur?: () => void;
}

export default function Slider({
  label,
  min,
  max,
  value,
  onChange,
  onBlur,
}: SliderProps) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const progress = ((value - min) / (max - min)) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  }, [value, min, max]);

  return (
    <div className="slider-container row vertical-center">
      <label>
        {label} : {value}%  <HelpTooltip description="Determines how much votes you'll have to collect to unfreeze the lock." />
        <div className="slider-wrapper">
          <div ref={progressRef} className="slider-progress"></div>
          <input
            ref={sliderRef}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={onBlur}
          />
        </div>
        
      </label>
    </div>
  );
}