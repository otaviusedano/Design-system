import React, { useMemo, useState } from 'react';

import './text-input.css';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
}

const useControlledValue = (value?: string, defaultValue?: string) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
  const isControlled = useMemo(() => value !== undefined, [value]);

  const currentValue = isControlled ? (value as string) : internalValue;

  const updateValue = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
  };

  return { value: currentValue, isControlled, updateValue };
};

export const TextInput = ({
  label,
  placeholder,
  value,
  defaultValue,
  helperText,
  errorText,
  disabled,
  autoFocus,
  prefix,
  suffix,
  multiline,
  rows = 3,
  type = 'text',
  onChange,
}: TextInputProps) => {
  const { value: currentValue, updateValue } = useControlledValue(value, defaultValue);
  const isError = Boolean(errorText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateValue(event.target.value);
    onChange?.(event.target.value);
  };

  const commonProps = {
    className: 'storybook-text-input__field',
    placeholder,
    disabled,
    value: currentValue,
    onChange: handleChange,
    autoFocus,
    'aria-invalid': isError,
  };

  return (
    <label
      className={[
        'storybook-text-input',
        isError ? 'is-error' : '',
        disabled ? 'is-disabled' : '',
      ].join(' ')}
    >
      {label ? <span className="storybook-text-input__label">{label}</span> : null}
      <div className="storybook-text-input__control">
        {prefix ? <span className="storybook-text-input__prefix">{prefix}</span> : null}
        {multiline ? (
          <textarea
            {...commonProps}
            rows={rows}
            className={`${commonProps.className} storybook-text-input__textarea`}
          />
        ) : (
          <input {...commonProps} type={type} />
        )}
        {suffix ? <span className="storybook-text-input__suffix">{suffix}</span> : null}
      </div>
      {helperText || errorText ? (
        <span className="storybook-text-input__helper">{errorText ?? helperText}</span>
      ) : null}
      {type === 'range' ? (
        <span className="storybook-text-input__range-value">{currentValue}</span>
      ) : null}
    </label>
  );
};

