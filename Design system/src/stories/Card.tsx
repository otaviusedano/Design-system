import React from 'react';

import './card.css';

export interface CardProps {
  title?: string;
  tagLabel?: string;
  content?: React.ReactNode;
  variation?: 'multiple-actions' | 'simple-action';
  icon?: React.ReactNode;
  onActionClick?: () => void;
  onDetailsClick?: () => void;
}

export const Card = ({
  title = 'Titulo',
  tagLabel = 'Nome da tag',
  content = 'Insira o conteudo aqui',
  variation = 'multiple-actions',
  icon,
  onActionClick,
  onDetailsClick,
}: CardProps) => {
  const isSimpleAction = variation === 'simple-action';

  return (
    <article className="storybook-card-v2">
      <header className="storybook-card-v2__header">
        <div className="storybook-card-v2__title-wrap">
          <div className="storybook-card-v2__title-icon" aria-hidden="true">
            {icon || <i className="fa-light fa-file-lines" />}
          </div>
          <h3 className="storybook-card-v2__title">{title}</h3>
        </div>
        <div className="storybook-card-v2__actions-wrap">
          <span className="storybook-card-v2__tag">{tagLabel}</span>
          {isSimpleAction ? (
            <button
              type="button"
              className="storybook-card-v2__details"
              onClick={onDetailsClick}
            >
              Detalhes
            </button>
          ) : (
            <button
              type="button"
              className="storybook-card-v2__action-button"
              aria-label="Mais acoes"
              onClick={onActionClick}
            >
              <span aria-hidden="true">⋮</span>
            </button>
          )}
        </div>
      </header>
      <div className="storybook-card-v2__content">{content}</div>
    </article>
  );
};

