import React from 'react';

import './sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hasArrow?: boolean;
  disabled?: boolean;
}

export interface SidebarHeader {
  onBack?: () => void;
  brandIcon?: React.ReactNode;
  brandText?: string;
}

export interface SidebarUser {
  avatar?: React.ReactNode;
  name: string;
  isOnline?: boolean;
}

export interface SidebarProps {
  header?: SidebarHeader;
  items: SidebarItem[];
  user?: SidebarUser;
  copyright?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
}

export const Sidebar = ({
  header,
  items,
  user,
  copyright,
  activeId,
  onSelect,
}: SidebarProps) => {
  return (
    <aside className="storybook-sidebar">
      {header && (
        <header className="storybook-sidebar__header">
          {header.onBack && (
            <button
              type="button"
              className="storybook-sidebar__back-button"
              onClick={header.onBack}
              aria-label="Voltar"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div className="storybook-sidebar__brand">
            {header.brandIcon && (
              <div className="storybook-sidebar__brand-icon">
                {header.brandIcon}
              </div>
            )}
            {header.brandText && (
              <span className="storybook-sidebar__brand-text">
                {header.brandText}
              </span>
            )}
          </div>
        </header>
      )}

      <nav className="storybook-sidebar__nav" aria-label="Sidebar navigation">
        <ul className="storybook-sidebar__list">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={[
                    'storybook-sidebar__item',
                    isActive ? 'storybook-sidebar__item--active' : '',
                    item.disabled ? 'storybook-sidebar__item--disabled' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => !item.disabled && onSelect?.(item.id)}
                  disabled={item.disabled}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className="storybook-sidebar__item-icon">
                      {item.icon}
                    </span>
                  )}
                  <span className="storybook-sidebar__item-label">
                    {item.label}
                  </span>
                  {item.hasArrow && (
                    <span className="storybook-sidebar__item-arrow">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="storybook-sidebar__user-section">
          <div className="storybook-sidebar__separator"></div>
          <div className="storybook-sidebar__user">
            {user.avatar && (
              <div className="storybook-sidebar__user-avatar">
                {user.avatar}
                {user.isOnline && (
                  <span className="storybook-sidebar__user-status"></span>
                )}
              </div>
            )}
            <span className="storybook-sidebar__user-name">{user.name}</span>
          </div>
        </div>
      )}

      {copyright && (
        <footer className="storybook-sidebar__footer">
          <p className="storybook-sidebar__copyright">{copyright}</p>
        </footer>
      )}
    </aside>
  );
};
