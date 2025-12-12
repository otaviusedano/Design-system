import React, { useEffect, useMemo, useRef, useState } from 'react';

import './select.css';

export type SelectOption = { label: string; value: string };

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  autoFocus?: boolean;
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

export const Select = ({
  label,
  placeholder = 'Selecione a opção',
  options,
  value,
  defaultValue,
  helperText,
  errorText,
  disabled,
  autoFocus,
  onChange,
}: SelectProps) => {
  const { value: currentValue, updateValue } = useControlledValue(value, defaultValue);
  const isError = Boolean(errorText);
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (next: string) => {
    updateValue(next);
    onChange?.(next);
    setIsOpen(false);
  };

  const displayLabel =
    options.find((option) => option.value === currentValue)?.label || placeholder;

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <label
      className={[
        'storybook-select',
        isError ? 'is-error' : '',
        disabled ? 'is-disabled' : '',
      ].join(' ')}
    >
      {label ? <span className="storybook-select__label">{label}</span> : null}
      <div
        ref={controlRef}
        className={[
          'storybook-select__control',
          isOpen ? 'is-open' : '',
          disabled ? 'is-disabled' : '',
        ].join(' ')}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={toggleOpen}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleOpen();
          }
          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={[
            'storybook-select__field',
            !currentValue ? 'is-placeholder' : '',
          ].join(' ')}
        >
          {displayLabel}
        </span>
        <span className="storybook-select__arrow" aria-hidden>
          <svg
            className="storybook-select__arrow-icon"
            viewBox="0 0 24 24"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {isOpen ? (
          <div className="storybook-select__dropdown" role="listbox">
            {options.map((option) => (
              <button
                type="button"
                key={option.value}
                className={[
                  'storybook-select__option',
                  option.value === currentValue ? 'is-active' : '',
                ].join(' ')}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {helperText || errorText ? (
        <span className="storybook-select__helper">{errorText ?? helperText}</span>
      ) : null}
    </label>
  );
};

