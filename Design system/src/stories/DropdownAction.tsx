import './dropdown-action.css';

export interface DropdownActionProps {
  className?: string;
  state?: 'default' | 'hover' | 'focus' | 'pressed';
  variation?: 'closed' | 'opened';
}

export const DropdownAction = ({
  className,
  state = 'default',
  variation = 'closed',
}: DropdownActionProps) => {
  const isOpened = variation === 'opened';
  const isButtonActive = isOpened && (state === 'hover' || state === 'focus' || state === 'pressed');
  const isButtonFocused = state === 'focus';
  const highlightedState = isOpened ? state : 'default';

  return (
    <div className={['storybook-dropdown', className].filter(Boolean).join(' ')} data-node-id="300:6775">
      <div className={['storybook-dropdown__focus-wrapper', isButtonFocused ? 'is-focused' : ''].join(' ')}>
        <button
          type="button"
          className={[
            'storybook-dropdown__trigger',
            isButtonActive ? 'is-active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-haspopup="menu"
          aria-expanded={isOpened}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            fill="currentColor"
          >
            <path d="M12 5.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0 9a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0 9a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
          </svg>
        </button>
      </div>

      {isOpened ? (
        <div className="storybook-dropdown__menu" role="menu" data-node-id="300:6778">
          <button type="button" className="storybook-dropdown__item" role="menuitem">
            <span className="storybook-dropdown__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 3h8l4 4v14H9V3Zm8 0v4h4M3 7h4M3 11h4M3 15h4M3 19h4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Detalhes</span>
          </button>

          <button
            type="button"
            className={[
              'storybook-dropdown__item',
              'storybook-dropdown__item-edit',
              highlightedState === 'hover' ? 'is-hover' : '',
              highlightedState === 'focus' ? 'is-focus' : '',
              highlightedState === 'pressed' ? 'is-pressed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role="menuitem"
          >
            <span className="storybook-dropdown__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 20h4l10-10-4-4L4 16v4Zm12-12 2-2a1.414 1.414 0 1 0-2-2l-2 2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Editar</span>
          </button>

          <button type="button" className="storybook-dropdown__item is-danger" role="menuitem">
            <span className="storybook-dropdown__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7h12M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 13h8l1-13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Deletar</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DropdownAction;
