import './tooltip.css';

export interface TooltipProps {
  /** Texto exibido no tooltip */
  message?: string;
  /** Classe opcional para customizacao externa */
  className?: string;
}

export const Tooltip = ({
  message = 'Mensagem do tooltip.',
  className,
}: TooltipProps) => {
  return (
    <div
      role="tooltip"
      className={['storybook-tooltip', className].filter(Boolean).join(' ')}
      data-node-id="803:7789"
    >
      <p className="storybook-tooltip__message">{message}</p>
    </div>
  );
};
