import './select.css';

export type SelectOption = { label: string; value: string };
export type SelectState = 'Default' | 'Focus' | 'Filled' | 'Disabled' | 'Error';

export interface SelectProps {
  className?: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  state?: SelectState;
  showIcon?: boolean;
  value?: string;
  errorText?: string;
}

const baseOptions: SelectOption[] = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
];

const getDisplayText = ({
  state,
  placeholder,
  value,
  options,
}: {
  state: SelectState;
  placeholder: string;
  value?: string;
  options: SelectOption[];
}) => {
  if (state === 'Disabled') return 'Disabled';
  if (state === 'Focus') return '|';

  const selectedOption = options.find((option) => option.value === value);
  if (selectedOption) return selectedOption.label;

  if (state === 'Filled' || state === 'Error') {
    return options[1]?.label ?? options[0]?.label ?? placeholder;
  }

  return placeholder;
};

export const Select = ({
  className,
  label = 'Label',
  placeholder = 'Select...',
  options = baseOptions,
  state = 'Default',
  showIcon = true,
  value,
  errorText = 'Error message.',
}: SelectProps) => {
  const isFocus = state === 'Focus';
  const isError = state === 'Error';
  const isDisabled = state === 'Disabled';
  const text = getDisplayText({ state, placeholder, value, options });
  const hasPlaceholderStyle = state === 'Default';

  return (
    <div
      className={['storybook-select', `is-${state.toLowerCase()}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="storybook-select__label">{label}</span>

      <div className="storybook-select__input-area" role="button" aria-expanded={isFocus}>
        <span
          className={[
            'storybook-select__value',
            hasPlaceholderStyle ? 'is-placeholder' : '',
            isError ? 'is-negative' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {text}
        </span>

        {showIcon ? (
          <span className={['storybook-select__icon', isDisabled ? 'is-disabled' : ''].join(' ')}>
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : null}
      </div>

      {isFocus ? (
        <div className="storybook-select__dropdown" role="listbox">
          {options.map((option, index) => (
            <div
              key={option.value}
              className={[
                'storybook-select__option',
                index === 1 ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {option.label}
            </div>
          ))}
        </div>
      ) : null}

      {isError ? <span className="storybook-select__error">{errorText}</span> : null}
    </div>
  );
};

