import './text-input.css';

export type TextInputState = 'Default' | 'Focus' | 'Filled' | 'Disabled' | 'Error';
export type TextInputVariation = 'Default' | 'Price' | 'Percent' | 'Range' | 'Text area';

export interface TextInputProps {
  className?: string;
  label?: string;
  state?: TextInputState;
  variation?: TextInputVariation;
  errorText?: string;
  showIcon?: boolean;
}

const EyeSlashIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path
      d="M3 3l18 18M10.58 10.58A2 2 0 0012 14a2 2 0 001.41-.58M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-1.03 2.3-2.86 4.17-5.14 5.31M6.23 6.23C3.9 7.53 2.08 9.58 1 12c.76 1.7 1.91 3.16 3.35 4.27"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type ValueTone = 'primary' | 'secondary' | 'negative';

type SingleFieldValue = {
  content: string;
  tone: ValueTone;
  prefix?: string;
  prefixTone?: ValueTone;
};

const getLabel = (variation: TextInputVariation, customLabel?: string) => {
  if (customLabel) return customLabel;
  if (variation === 'Default') return 'Label';
  return variation;
};

const getSingleFieldValue = (
  state: TextInputState,
  variation: Exclude<TextInputVariation, 'Range'>,
): SingleFieldValue => {
  if (variation === 'Default') {
    if (state === 'Focus') return { content: '|', tone: 'primary' };
    if (state === 'Filled') return { content: 'Filled', tone: 'primary' };
    if (state === 'Error') return { content: 'Filled', tone: 'negative' };
    if (state === 'Disabled') return { content: 'Disabled', tone: 'secondary' };
    return { content: 'Placeholder', tone: 'secondary' };
  }

  if (variation === 'Price') {
    if (state === 'Focus') return { content: '|', tone: 'primary', prefix: 'R$', prefixTone: 'primary' };
    if (state === 'Filled') {
      return { content: '1.000,00', tone: 'primary', prefix: 'R$', prefixTone: 'primary' };
    }
    if (state === 'Disabled') {
      return { content: '1.000,00', tone: 'secondary', prefix: 'R$', prefixTone: 'primary' };
    }
    if (state === 'Error') {
      return { content: '10,00', tone: 'negative', prefix: 'R$', prefixTone: 'negative' };
    }
    return { content: '00,00', tone: 'secondary', prefix: 'R$', prefixTone: 'primary' };
  }

  if (variation === 'Percent') {
    if (state === 'Focus') return { content: '|%', tone: 'primary' };
    if (state === 'Filled') return { content: '10%', tone: 'primary' };
    if (state === 'Disabled') return { content: '05%', tone: 'secondary' };
    if (state === 'Error') return { content: '01%', tone: 'negative' };
    return { content: '00%', tone: 'secondary' };
  }

  if (state === 'Focus') return { content: '|', tone: 'primary' };
  if (state === 'Filled') return { content: 'Enter your...', tone: 'primary' };
  if (state === 'Disabled') return { content: 'Your e-mail...', tone: 'secondary' };
  if (state === 'Error') return { content: 'placeholder', tone: 'negative' };
  return { content: 'Placeholder', tone: 'secondary' };
};

const getRangeText = (state: TextInputState) => {
  if (state === 'Focus') return ['|', '|'];
  if (state === 'Filled') return ['10', '100'];
  if (state === 'Disabled') return ['10', '100'];
  if (state === 'Error') return ['100', '10'];
  return ['0', '0'];
};

export const TextInput = ({
  className,
  label,
  state = 'Default',
  variation = 'Default',
  errorText = 'Error message.',
  showIcon,
}: TextInputProps) => {
  const isError = state === 'Error';
  const isDisabled = state === 'Disabled';
  const isFocused = state === 'Focus';
  const shouldShowIcon = showIcon ?? variation === 'Default';
  const singleFieldValue = variation === 'Range' ? null : getSingleFieldValue(state, variation);

  const rootClassName = [
    'storybook-text-input',
    `is-${state.toLowerCase()}`,
    `is-${variation.toLowerCase().replace(/\s+/g, '-')}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const fieldClassName = [
    'storybook-text-input__control',
    isError ? 'is-error' : '',
    isDisabled ? 'is-disabled' : '',
    isFocused || state === 'Filled' ? 'is-filled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <span className="storybook-text-input__label">{getLabel(variation, label)}</span>

      {variation === 'Range' ? (
        <div className="storybook-text-input__range">
          {getRangeText(state).map((value, index) => (
            <div key={`${value}-${index}`} className={fieldClassName}>
              <span
                className={[
                  'storybook-text-input__value',
                  isError ? 'is-negative' : '',
                  isDisabled || state === 'Default' ? 'is-secondary' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={fieldClassName}>
          <span
            className={[
              'storybook-text-input__value',
              singleFieldValue?.tone === 'secondary' ? 'is-secondary' : '',
              singleFieldValue?.tone === 'negative' ? 'is-negative' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {singleFieldValue?.prefix ? (
              <span
                className={[
                  'storybook-text-input__value-prefix',
                  singleFieldValue.prefixTone === 'negative' ? 'is-negative' : '',
                  singleFieldValue.prefixTone === 'secondary' ? 'is-secondary' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {singleFieldValue.prefix}
              </span>
            ) : null}
            {singleFieldValue?.prefix ? ' ' : null}
            {singleFieldValue?.content}
          </span>
          {shouldShowIcon ? (
            <span className="storybook-text-input__icon" aria-hidden="true">
              <EyeSlashIcon />
            </span>
          ) : null}
        </div>
      )}

      {isError ? <span className="storybook-text-input__error">{errorText}</span> : null}
    </div>
  );
};

