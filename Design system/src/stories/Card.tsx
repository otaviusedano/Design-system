import React from 'react';

import './card.css';

export interface CardAction {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export interface CardProps {
  title: string;
  description: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: CardAction[];
}

export const Card = ({
  title,
  description,
  subtitle,
  icon,
  footer,
  actions = [],
}: CardProps) => {
  return (
    <article className="storybook-card">
      <header className="storybook-card__header">
        {icon ? <div className="storybook-card__icon">{icon}</div> : null}
        <div>
          <h3 className="storybook-card__title">{title}</h3>
          {subtitle ? <p className="storybook-card__subtitle">{subtitle}</p> : null}
        </div>
      </header>
      <div className="storybook-card__body">{description}</div>
      {actions.length ? (
        <div className="storybook-card__actions">
          {actions.map((action) => (
            <a
              key={action.label}
              className={[
                'storybook-card__link',
                action.variant === 'secondary' ? 'secondary' : '',
              ].join(' ')}
              href={action.href ?? '#'}
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : null}
      {footer ? <div className="storybook-card__footer">{footer}</div> : null}
    </article>
  );
};

