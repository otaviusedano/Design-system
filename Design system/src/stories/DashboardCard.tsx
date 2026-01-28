import React from 'react';

import { Tag } from './Tag';
import './dashboard-card.css';

export interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    variant?: 'purple' | 'sky' | 'water' | 'gray' | 'red';
  };
  onClick?: () => void;
}

export const DashboardCard = ({
  title,
  value,
  icon,
  trend,
  onClick,
}: DashboardCardProps) => {
  return (
    <article
      className={[
        'storybook-dashboard-card',
        onClick ? 'storybook-dashboard-card--clickable' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      <header className="storybook-dashboard-card__header">
        <div className="storybook-dashboard-card__value">{value}</div>
        <div className="storybook-dashboard-card__icon">{icon}</div>
      </header>
      <div className="storybook-dashboard-card__body">
        <div className="storybook-dashboard-card__footer">
          <h3 className="storybook-dashboard-card__title">{title}</h3>
          {trend && (
            <Tag
              label={trend.value}
              variant={trend.variant || 'purple'}
              size="md"
              readOnly
            />
          )}
        </div>
      </div>
    </article>
  );
};
