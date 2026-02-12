import React from 'react';

import './Sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hasArrow?: boolean;
  disabled?: boolean;
}

export interface SidebarHeader {
  onBack?: () => void;
  backIcon?: React.ReactNode;
  brandIcon?: React.ReactNode;
  brandText?: string;
  mobileContent?: React.ReactNode;
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
  device?: 'desktop' | 'mobile';
  state?: 'expanded' | 'collected' | 'default';
  collapsedCopyright?: string;
}

const DefaultBackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Sidebar = ({
  header,
  items,
  user,
  copyright,
  activeId,
  onSelect,
  device = 'desktop',
  state = 'expanded',
  collapsedCopyright,
}: SidebarProps) => {
  const isDesktop = device === 'desktop';
  const isMobile = device === 'mobile';
  const isExpanded = isDesktop && state === 'expanded';
  const isCollapsed = isDesktop && state === 'collected';
  const isMobileDefault = isMobile && state === 'default';
  const headerIcon = header?.backIcon ?? <DefaultBackIcon />;
  const collapsedCopyrightText =
    collapsedCopyright ?? (copyright ? '©' : undefined);

  return (
    <aside
      className={[
        'storybook-sidebar',
        isExpanded ? 'storybook-sidebar--expanded' : '',
        isCollapsed ? 'storybook-sidebar--collapsed' : '',
        isMobileDefault ? 'storybook-sidebar--mobile' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="storybook-sidebar__content">
        {header && isExpanded && (
          <header className="storybook-sidebar__header storybook-sidebar__header--expanded">
            {header.onBack && (
              <button
                type="button"
                className="storybook-sidebar__icon-button"
                onClick={header.onBack}
                aria-label="Voltar"
              >
                {headerIcon}
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

        {header && isCollapsed && (
          <header className="storybook-sidebar__header storybook-sidebar__header--collapsed">
            {header.onBack && (
              <button
                type="button"
                className="storybook-sidebar__icon-button"
                onClick={header.onBack}
                aria-label="Abrir menu"
              >
                {headerIcon}
              </button>
            )}
            {header.brandIcon && (
              <div className="storybook-sidebar__brand-icon">
                {header.brandIcon}
              </div>
            )}
          </header>
        )}

        {header && isMobileDefault && (
          <header className="storybook-sidebar__header storybook-sidebar__header--mobile">
            {header.mobileContent ? (
              header.mobileContent
            ) : (
              <div className="storybook-sidebar__mobile-fallback">
                {header.onBack && (
                  <button
                    type="button"
                    className="storybook-sidebar__icon-button"
                    onClick={header.onBack}
                    aria-label="Fechar"
                  >
                    {headerIcon}
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
              </div>
            )}
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
                          aria-hidden="true"
                          focusable="false"
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
      </div>

      {(user || copyright) && (
        <div className="storybook-sidebar__footer">
          <div className="storybook-sidebar__separator"></div>
          {user && (
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
          )}
          {(isCollapsed ? collapsedCopyrightText : copyright) && (
            <p className="storybook-sidebar__copyright">
              {isCollapsed ? collapsedCopyrightText : copyright}
            </p>
          )}
        </div>
      )}
    </aside>
  );
};
