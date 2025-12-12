import React, { useEffect, useMemo, useRef, useState } from 'react';

import './checkbox.css';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

const useControlled = (checked?: boolean, defaultChecked?: boolean) => {
  const [internal, setInternal] = useState<boolean>(defaultChecked ?? false);
  const isControlled = useMemo(() => checked !== undefined, [checked]);

  const value = isControlled ? Boolean(checked) : internal;
  const setValue = (next: boolean) => {
    if (!isControlled) setInternal(next);
  };

  return { value, isControlled, setValue };
};

export const Checkbox = ({
  label,
  helperText,
  errorText,
  checked,
  defaultChecked,
  disabled,
  onChange,
  autoFocus,
  ...props
}: CheckboxProps) => {
  const { value, setValue } = useControlled(checked, defaultChecked);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const isError = Boolean(errorText);

  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
    }
  }, [autoFocus]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
    onChange?.(event);
  };

  return (
    <label
      className={[
        'storybook-checkbox',
        value ? 'is-checked' : '',
        isFocus ? 'is-focus' : '',
        isError ? 'is-error' : '',
        disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="storybook-checkbox__box">
        <input
          {...props}
          ref={ref}
          type="checkbox"
          className="storybook-checkbox__input"
          checked={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          aria-invalid={isError}
        />
        <span className="storybook-checkbox__mark">
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path
              d="M5 12.5l4 4 10-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      <span className="storybook-checkbox__stack">
        {label ? <span className="storybook-checkbox__label">{label}</span> : null}
        {errorText || (helperText && !disabled) ? (
          <span className="storybook-checkbox__helper">{errorText ?? helperText}</span>
        ) : null}
      </span>
    </label>
  );
};

