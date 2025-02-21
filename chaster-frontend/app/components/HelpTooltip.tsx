import React, { useState } from 'react';
import './HelpTooltip.sass';

export interface HelpTooltipProps {
  description: string;
}

export default function HelpTooltip({ description }: HelpTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="help-tooltip"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="help-tooltip-icon">?</div>
      {visible && (
        <div className="help-tooltip-popup">
          {description}
        </div>
      )}
    </div>
  );
}