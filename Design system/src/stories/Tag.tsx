import React from 'react';

import './tag.css';

type TagVariant = 'purple' | 'sky' | 'water' | 'gray' | 'red';
type TagSize = 'md' | 'lg';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  deletable?: boolean;
  readOnly?: boolean;
  onDelete?: () => void;
}

export const Tag = ({
  label,
  variant = 'purple',
  size = 'md',
  deletable,
  readOnly,
  onDelete,
}: TagProps) => {
  return (
    <span
      className={[
        'storybook-tag',
        `storybook-tag--${variant}`,
        `storybook-tag--${size}`,
        readOnly ? 'storybook-tag--readonly' : '',
      ].join(' ')}
    >
      <span className="storybook-tag__label">{label}</span>
      {deletable ? (
        <button
          type="button"
          className="storybook-tag__close"
          aria-label={`Remover ${label}`}
          onClick={onDelete}
        >
          <svg
            className="storybook-tag__close-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
    </span>
  );
};




