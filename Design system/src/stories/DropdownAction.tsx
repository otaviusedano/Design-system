import React, { useEffect, useRef, useState } from 'react';

import './dropdown-action.css';

export type DropdownItem = {
  label: string;
  danger?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export interface DropdownActionProps {
  items: DropdownItem[];
  defaultOpen?: boolean;
  isFocused?: boolean;
}

export const DropdownAction = ({ items, defaultOpen, isFocused }: DropdownActionProps) => {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = () => setOpen((prev) => !prev);

  const handleItemClick = (item: DropdownItem) => {
    item.onClick?.();
    setOpen(false);
  };

  return (
    <div className="storybook-dropdown" ref={ref}>
      <button
        type="button"
        className={[
          'storybook-dropdown__trigger',
          isFocused ? 'is-focused' : '',
          open ? 'is-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          style={{ color: 'currentColor' }}
        >
          <path
            d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            fill="currentColor"
          />
        </svg>
      </button>

      {open ? (
        <div className="storybook-dropdown__menu" role="menu">
          {items.map((item) => (
            <button
              type="button"
              key={item.label}
              className={[
                'storybook-dropdown__item',
                item.danger ? 'is-danger' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              role="menuitem"
              onClick={() => handleItemClick(item)}
            >
              {item.icon ? item.icon : null}
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

