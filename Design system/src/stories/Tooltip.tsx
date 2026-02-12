import React, { useState, useCallback, useId } from 'react';

import './tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Conteúdo exibido no tooltip */
  content: React.ReactNode;
  /** Elemento que recebe hover/focus para mostrar o tooltip */
  children: React.ReactElement;
  /** Posição do tooltip em relação ao trigger */
  placement?: TooltipPlacement;
  /** Se true, desabilita o tooltip */
  disabled?: boolean;
}

export const Tooltip = ({
  content,
  children,
  placement = 'top',
  disabled = false,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const id = useId();

  const show = useCallback(() => {
    if (!disabled) setVisible(true);
  }, [disabled]);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const trigger = React.Children.only(children);
  const triggerProps = {
    onMouseEnter: (e: React.MouseEvent) => {
      trigger.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      trigger.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      trigger.props.onFocus?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      trigger.props.onBlur?.(e);
      hide();
    },
    'aria-describedby': visible ? id : undefined,
  };

  return (
    <div className="storybook-tooltip__wrapper">
      {React.cloneElement(trigger, {
        ...triggerProps,
        className: [trigger.props.className, 'storybook-tooltip__trigger']
          .filter(Boolean)
          .join(' '),
      })}
      {visible && !disabled && (
        <div
          id={id}
          role="tooltip"
          className={`storybook-tooltip__popup storybook-tooltip__popup--${placement}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
