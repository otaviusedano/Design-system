import type { ReactNode } from "react";
import "./Toast.css";

export type ToastState = "success" | "error";

export type ToastProps = {
  id?: string;
  state?: ToastState;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissLabel?: string;
  onDismiss?: () => void;
  icon?: ReactNode;
};

export function Toast({
  id,
  state = "success",
  title,
  description,
  actionLabel,
  onAction,
  dismissLabel = "Fechar",
  onDismiss,
  icon,
}: ToastProps) {
  const showAction = actionLabel && onAction;

  return (
    <div
      id={id}
      className={["toast-root", `toast-${state}`].join(" ")}
      role="status"
      aria-live="polite"
    >
      {icon ? <span className="toast-icon">{icon}</span> : null}

      <div className="toast-content">
        <strong className="toast-title">{title}</strong>
        {description ? (
          <span className="toast-description">{description}</span>
        ) : null}
      </div>

      <div className="toast-actions">
        {showAction ? (
          <button
            type="button"
            className="toast-action"
            onClick={onAction}
            aria-label={actionLabel}
          >
            {actionLabel}
          </button>
        ) : null}

        {onDismiss ? (
          <button
            type="button"
            className="toast-dismiss"
            onClick={onDismiss}
            aria-label={dismissLabel}
          >
            <span className="toast-dismiss-icon" aria-hidden="true">
              <CloseIcon />
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="m4 4 6 6M10 4l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
