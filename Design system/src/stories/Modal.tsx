import { useEffect, useId, type ReactNode } from "react";
import { Button } from "./Button";
import "./Modal.css";

export type ModalSize = "sm" | "md" | "lg";
export type ModalTone = "default" | "danger";

export type ModalAction = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
};

export type ModalProps = {
  id?: string;
  open?: boolean;
  size?: ModalSize;
  tone?: ModalTone;
  title: string;
  description?: string;
  children?: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  footer?: ReactNode;
  showClose?: boolean;
  closeLabel?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
};

export function Modal({
  id,
  open = true,
  size = "md",
  tone = "default",
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  footer,
  showClose = true,
  closeLabel = "Fechar",
  closeOnOverlay = true,
  closeOnEsc = true,
  onClose,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const showFooterActions = Boolean(primaryAction || secondaryAction);

  useEffect(() => {
    if (!open || !closeOnEsc) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(event) => {
        if (!closeOnOverlay) return;
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        id={id}
        className={[
          "modal-panel",
          `modal-size-${size}`,
          tone === "danger" ? "modal-tone-danger" : "",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <header className="modal-header">
          <div className="modal-heading">
            <h2 id={titleId} className="modal-title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="modal-description">
                {description}
              </p>
            ) : null}
          </div>
          {showClose ? (
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <CloseIcon />
            </button>
          ) : null}
        </header>

        {children ? <div className="modal-body">{children}</div> : null}
        {!children ? (
          <div className="modal-body">
            <div className="modal-placeholder">Insira o conteudo aqui</div>
          </div>
        ) : null}

        {footer ? (
          <footer className="modal-footer">{footer}</footer>
        ) : showFooterActions ? (
          <footer className="modal-footer">
            {secondaryAction ? (
              <Button
                label={secondaryAction.label}
                variant={secondaryAction.variant ?? "secondary"}
                size="small"
                onClick={secondaryAction.onClick}
                disabled={!secondaryAction.onClick}
              />
            ) : null}
            {primaryAction ? (
              <Button
                label={primaryAction.label}
                variant={primaryAction.variant ?? "primary"}
                size="small"
                onClick={primaryAction.onClick}
                disabled={!primaryAction.onClick}
              />
            ) : null}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
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
