import React from 'react';

import './quota-card.css';

export interface QuotaCardProps {
  title: string;
  status?: {
    label: string;
    variant: 'purple' | 'sky' | 'water' | 'gray' | 'red';
  };
  values: Array<{
    label: string;
    value: string;
  }>;
  logo?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const QuotaCard = ({
  title,
  status,
  values,
  logo,
  icon,
  className,
}: QuotaCardProps) => {
  const iconContent = icon ?? <i className="fa-regular fa-house" aria-hidden="true" />;

  const logoContent = logo ?? (
    <div className="storybook-quota-card__brand" aria-label="Stefanini Group">
      <span className="storybook-quota-card__brand-name">stefanini</span>
      <span className="storybook-quota-card__brand-group">GROUP</span>
    </div>
  );

  return (
    <article
      className={['storybook-quota-card', className].filter(Boolean).join(' ')}
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
        <div className="storybook-quota-card__logo">
          <div className="storybook-quota-card__icon">{iconContent}</div>
          {logoContent}
        </div>
      </div>
    </article>
  );
};
