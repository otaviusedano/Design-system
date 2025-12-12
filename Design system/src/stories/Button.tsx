import React from 'react';

import './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFocused?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
}

/** Botão principal do design system */
export const Button = ({
  label,
  variant = 'primary',
  size = 'medium',
  isFocused = false,
  disabled,
  icon,
  iconPosition = 'left',
  iconOnly = false,
  ...props
}: ButtonProps) => {
  const classNames = [
    'storybook-button',
    `storybook-button--${variant}`,
    `storybook-button--${size}`,
    iconOnly ? 'storybook-button--icon-only' : '',
    isFocused ? 'storybook-button--focus' : '',
    disabled ? 'storybook-button--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled}
      aria-label={iconOnly ? label : undefined}
      {...props}
    >
      {icon && iconPosition === 'left' ? icon : null}
      {!iconOnly ? <span>{label}</span> : null}
      {icon && iconPosition === 'right' ? icon : null}
    </button>
  );
};
