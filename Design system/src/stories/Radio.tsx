import React, { useEffect, useMemo, useRef, useState } from 'react';

import './radio.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
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

  return { value, setValue };
};

export const Radio = ({
  label,
  helperText,
  errorText,
  checked,
  defaultChecked,
  disabled,
  onChange,
  autoFocus,
  ...props
}: RadioProps) => {
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
        'storybook-radio',
        value ? 'is-checked' : '',
        isFocus ? 'is-focus' : '',
        isError ? 'is-error' : '',
        disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="storybook-radio__control">
        <input
          {...props}
          ref={ref}
          type="radio"
          className="storybook-radio__input"
          checked={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          aria-invalid={isError}
        />
        <span className="storybook-radio__outer">
          <span className="storybook-radio__inner" />
        </span>
      </span>
      <span className="storybook-radio__stack">
        {label ? <span className="storybook-radio__label">{label}</span> : null}
        {errorText || (helperText && !disabled) ? (
          <span className="storybook-radio__helper">{errorText ?? helperText}</span>
        ) : null}
      </span>
    </label>
  );
};

