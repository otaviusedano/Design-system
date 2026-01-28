import React from 'react';

import './value-display.css';

export interface ValueDisplayProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  layout?: 'inline' | 'stacked';
  size?: 'small' | 'medium' | 'large';
}

export const ValueDisplay = ({
  label,
  value,
  icon,
  layout = 'inline',
  size = 'medium',
}: ValueDisplayProps) => {
  return (
    <div
      className={[
        'storybook-value-display',
        `storybook-value-display--${layout}`,
        `storybook-value-display--${size}`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && <div className="storybook-value-display__icon">{icon}</div>}
      <div className="storybook-value-display__content">
        <span className="storybook-value-display__label">{label}</span>
        <span className="storybook-value-display__value">{value}</span>
      </div>
    </div>
  );
};
