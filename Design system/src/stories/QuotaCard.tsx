import React from 'react';

import './quota-card.css';

export interface QuotaCardProps {
  title: string;
  status?: {
    label: string;
    variant: 'success' | 'error' | 'warning' | 'info';
  };
  values: Array<{
    label: string;
    value: string;
  }>;
  logo?: React.ReactNode;
  onClick?: () => void;
}

export const QuotaCard = ({
  title,
  status,
  values,
  logo,
  onClick,
}: QuotaCardProps) => {
  return (
    <article
      className={[
        'storybook-quota-card',
        onClick ? 'storybook-quota-card--clickable' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      <header className="storybook-quota-card__header">
        <h2 className="storybook-quota-card__title">{title}</h2>
        {status && (
          <span
            className={[
              'storybook-quota-card__status',
              `storybook-quota-card__status--${status.variant}`,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {status.label}
          </span>
        )}
      </header>
      <div className="storybook-quota-card__body">
        <div className="storybook-quota-card__values">
          {values.map((item, index) => (
            <div key={index} className="storybook-quota-card__value-item">
              <div className="storybook-quota-card__value-content">
                <span className="storybook-quota-card__value-label">
                  {item.label}
                </span>
                <span className="storybook-quota-card__value-amount">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
        {logo && (
          <div className="storybook-quota-card__logo">{logo}</div>
        )}
      </div>
    </article>
  );
};
