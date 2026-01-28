import React, { useState } from 'react';

import './breadcrumbs.css';

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumbs = ({ items, separator }: BreadcrumbsProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const defaultSeparator = (
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
  );

  const renderSeparator = separator || defaultSeparator;
  const currentItem = items[items.length - 1];
  const title = currentItem?.label || '';

  // Se há mais de 4 itens, truncar o segundo item
  const shouldTruncate = items.length > 4;
  const hiddenItem = shouldTruncate ? items[1] : null;

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => {
    return (
      <li key={item.id} className="storybook-breadcrumbs__item">
        {isLast ? (
          <span
            className="storybook-breadcrumbs__link storybook-breadcrumbs__link--current"
            aria-current="page"
          >
            {item.label}
          </span>
        ) : item.href ? (
          <a
            href={item.href}
            className="storybook-breadcrumbs__link"
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {item.label}
          </a>
        ) : (
          <button
            type="button"
            className="storybook-breadcrumbs__link storybook-breadcrumbs__link--button"
            onClick={item.onClick}
          >
            {item.label}
          </button>
        )}
        {!isLast && (
          <span className="storybook-breadcrumbs__separator" aria-hidden="true">
            {renderSeparator}
          </span>
        )}
      </li>
    );
  };

  return (
    <div className="storybook-breadcrumbs-wrapper">
      <nav className="storybook-breadcrumbs" aria-label="Breadcrumb">
        <ol className="storybook-breadcrumbs__list">
          {shouldTruncate ? (
            <>
              {/* Primeiro item */}
              {renderItem(items[0], false)}
              {/* Separador */}
              <span className="storybook-breadcrumbs__separator" aria-hidden="true">
                {renderSeparator}
              </span>
              {/* Item truncado com tooltip */}
              <li
                className="storybook-breadcrumbs__item storybook-breadcrumbs__item--truncated"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                <span className="storybook-breadcrumbs__link storybook-breadcrumbs__link--truncated">
                  ...
                </span>
                {tooltipVisible && hiddenItem && (
                  <div className="storybook-breadcrumbs__tooltip">
                    {hiddenItem.label}
                  </div>
                )}
                <span className="storybook-breadcrumbs__separator" aria-hidden="true">
                  {renderSeparator}
                </span>
              </li>
              {/* Resto dos itens (do terceiro em diante, excluindo o último) */}
              {items.slice(2, -1).map((item) => renderItem(item, false))}
              {/* Último item */}
              {renderItem(items[items.length - 1], true)}
            </>
          ) : (
            items.map((item, index) => renderItem(item, index === items.length - 1))
          )}
        </ol>
      </nav>
      {title && (
        <h1 className="storybook-breadcrumbs__title">{title}</h1>
      )}
    </div>
  );
};
