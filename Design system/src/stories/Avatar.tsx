import React from 'react';

import './avatar.css';

export type AvatarSize = 'small' | 'medium' | 'large';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name: string;
  size?: AvatarSize;
  onClick?: () => void;
}

const getInitials = (name?: string): string => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar = ({
  src,
  alt,
  name,
  size = 'medium',
  onClick,
}: AvatarProps) => {
  const initials = getInitials(name);
  const hasImage = Boolean(src);

  return (
    <div
      className={[
        'storybook-avatar-wrapper',
        onClick ? 'storybook-avatar-wrapper--clickable' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={[
          'storybook-avatar',
          `storybook-avatar--${size}`,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={name}
      >
        {hasImage ? (
          <img
            src={src}
            alt={alt || name}
            className="storybook-avatar__image"
          />
        ) : (
          <div className="storybook-avatar__initials">
            {initials}
          </div>
        )}
      </div>
      <span className="storybook-avatar__name">{name}</span>
    </div>
  );
};
