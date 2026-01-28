import React from 'react';

import './summary-card.css';

export interface SummaryItem {
  label: string;
  value: string;
  isNegative?: boolean;
}

export interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
  totalLabel?: string;
  totalValue: string;
}

export const SummaryCard = ({
  title,
  items,
  totalLabel = 'Total:',
  totalValue,
}: SummaryCardProps) => {
  return (
    <article className="storybook-summary-card">
      <header className="storybook-summary-card__header">
        <h2 className="storybook-summary-card__title">{title}</h2>
      </header>
      <div className="storybook-summary-card__body">
        <div className="storybook-summary-card__items">
          {items.map((item, index) => (
            <div key={index} className="storybook-summary-card__item">
              <span className="storybook-summary-card__item-label">
                {item.label}
              </span>
              <span
                className={[
                  'storybook-summary-card__item-value',
                  item.isNegative
                    ? 'storybook-summary-card__item-value--negative'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="storybook-summary-card__divider"></div>
        <div className="storybook-summary-card__total">
          <span className="storybook-summary-card__total-label">
            {totalLabel}
          </span>
          <span className="storybook-summary-card__total-value">
            {totalValue}
          </span>
        </div>
      </div>
    </article>
  );
};
