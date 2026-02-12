import React from 'react';

import './empty-state.css';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const EmptyState = ({
  title,
  description,
  icon,
}: EmptyStateProps) => {
  return (
    <div className="storybook-empty-state">
      <div className="storybook-empty-state__icon">{icon}</div>
      <div className="storybook-empty-state__content">
        <h3 className="storybook-empty-state__title">{title}</h3>
        <p className="storybook-empty-state__description">{description}</p>
      </div>
    </div>
  );
};
