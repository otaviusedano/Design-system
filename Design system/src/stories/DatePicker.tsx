import './date-picker.css';

export type DatePickerState = 'Default' | 'Focus' | 'Filled' | 'Disabled' | 'Error';
export type DatePickerVariation = 'Default' | 'Range';

export interface DatePickerProps {
  className?: string;
  label?: string;
  state?: DatePickerState;
  variation?: DatePickerVariation;
  errorText?: string;
}

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const dayRows = [
  ['01', '02', '03', '04', '05', '06', '07'],
  ['08', '09', '10', '11', '12', '13', '14'],
  ['15', '16', '17', '18', '19', '20', '21'],
  ['22', '23', '24', '25', '26', '27', '28'],
  ['29', '30', '31', '01', '02', '03', '04'],
];

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8 3v4M16 3v4M4 9h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getSingleValue = (state: DatePickerState) => {
  if (state === 'Focus') return '|';
  if (state === 'Filled' || state === 'Disabled') return '10/11/2025';
  return '00/00/0000';
};

const getRangeValues = (state: DatePickerState) => {
  if (state === 'Focus') return ['|', '|'];
  if (state === 'Filled' || state === 'Disabled') return ['10/11/2025', '18/11/2025'];
  return ['00/00/0000', '00/00/0000'];
};

const shouldOpenCalendar = (state: DatePickerState) => state === 'Focus' || state === 'Filled';

export const DatePicker = ({
  className,
  label = 'Data',
  state = 'Default',
  variation = 'Default',
  errorText = 'Data vazia. Tente novamente.',
}: DatePickerProps) => {
  const isError = state === 'Error';
  const isDisabled = state === 'Disabled';
  const isOpen = shouldOpenCalendar(state);
  const isFilledLook = state === 'Focus' || state === 'Filled';

  const rootClassName = ['storybook-date-picker', `is-${state.toLowerCase()}`, `is-${variation.toLowerCase()}`, className]
    .filter(Boolean)
    .join(' ');

  const inputClassName = ['storybook-date-picker__field', isFilledLook ? 'is-filled' : '', isError ? 'is-error' : '', isDisabled ? 'is-disabled' : '']
    .filter(Boolean)
    .join(' ');

  const textClassName = ['storybook-date-picker__value', state === 'Default' ? 'is-placeholder' : '', isError ? 'is-negative' : '', isDisabled ? 'is-secondary' : '']
    .filter(Boolean)
    .join(' ');

  const iconClassName = ['storybook-date-picker__icon', isFilledLook ? 'is-primary' : '', isError ? 'is-negative' : '']
    .filter(Boolean)
    .join(' ');

  const rangeValues = getRangeValues(state);

  return (
    <div className={rootClassName}>
      <span className="storybook-date-picker__label">{label}</span>

      {variation === 'Range' ? (
        <div className="storybook-date-picker__range">
          {rangeValues.map((value, index) => (
            <div key={`${value}-${index}`} className={inputClassName}>
              <span className={textClassName}>{value}</span>
              <span className={iconClassName} aria-hidden="true">
                <CalendarIcon />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={inputClassName}>
          <span className={textClassName}>{getSingleValue(state)}</span>
          <span className={iconClassName} aria-hidden="true">
            <CalendarIcon />
          </span>
        </div>
      )}

      {isError ? <span className="storybook-date-picker__error">{errorText}</span> : null}

      {isOpen ? (
        <div className="storybook-date-picker__calendar" role="dialog" aria-label="Calendário">
          <div className="storybook-date-picker__calendar-header">
            <button type="button" className="storybook-date-picker__calendar-nav" aria-label="Mês anterior">
              <ChevronIcon direction="left" />
            </button>
            <span className="storybook-date-picker__calendar-title">Novembro 2025</span>
            <button type="button" className="storybook-date-picker__calendar-nav" aria-label="Próximo mês">
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div className="storybook-date-picker__calendar-grid">
            <div className="storybook-date-picker__weekday-row">
              {weekdays.map((day) => (
                <span key={day} className="storybook-date-picker__weekday">
                  {day}
                </span>
              ))}
            </div>

            {dayRows.map((row, rowIndex) => (
              <div key={`week-${rowIndex}`} className="storybook-date-picker__week-row">
                {row.map((day, dayIndex) => {
                  const isOutsideMonth = rowIndex === 4 && dayIndex >= 3;
                  const isPrimarySelection = day === '10' && !isOutsideMonth;
                  const isRangeEnd = variation === 'Range' && state === 'Filled' && day === '18';
                  const isRangeMiddle =
                    variation === 'Range' &&
                    state === 'Filled' &&
                    ['11', '12', '13', '14', '15', '16', '17'].includes(day);

                  const dayClassName = [
                    'storybook-date-picker__day',
                    isOutsideMonth ? 'is-outside' : '',
                    (isPrimarySelection && state === 'Filled') || isRangeEnd ? 'is-selected' : '',
                    isRangeMiddle ? 'is-in-range' : '',
                    !isOutsideMonth && ['05', '06', '07'].includes(day) ? 'is-medium' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <span key={`${rowIndex}-${day}`} className={dayClassName}>
                      {day}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
