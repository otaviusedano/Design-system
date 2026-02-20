import { useEffect, useId, type ReactNode } from "react";
import "./Modal.css";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type ModalProps = {
  id?: string;
  open?: boolean;
  size?: ModalSize;
  title: string;
  description?: string;
  showIllustration?: boolean;
  showGhostButton?: boolean;
  illustration?: ReactNode;
  children?: ReactNode;
  ghostAction?: ModalAction;
  outlinedAction?: ModalAction;
  primaryAction?: ModalAction;
  showClose?: boolean;
  closeLabel?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
};

export function Modal({
  id,
  open = true,
  size = "sm",
  title,
  description,
  showIllustration = true,
  showGhostButton = true,
  illustration,
  children,
  ghostAction,
  outlinedAction,
  primaryAction,
  showClose = true,
  closeLabel = "Fechar",
  closeOnOverlay = true,
  closeOnEsc = true,
  onClose,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const isSmall = size === "sm";
  const shouldShowIllustration = !isSmall && showIllustration;
  const shouldShowGhost = !isSmall && showGhostButton && ghostAction;

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
        className={["modal-panel", `modal-size-${size}`].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        {isSmall ? (
          <div className="modal-header-compact">
            <div className="modal-heading">
              <div className="modal-title-row">
                <h2 id={titleId} className="modal-title">
                  {title}
                </h2>
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
              </div>
              {description ? (
                <p id={descriptionId} className="modal-description">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="modal-header">
            <div className="modal-heading">
              {shouldShowIllustration ? (
                <div className="modal-illustration">
                  {illustration ?? "Insira a ilustracao ou icone aqui"}
                </div>
              ) : null}
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
                className="modal-close modal-close-floating"
                onClick={onClose}
                aria-label={closeLabel}
              >
                <CloseIcon />
              </button>
            ) : null}
          </div>
        )}

        <div className="modal-body">
          <div className="modal-content-placeholder">
            {children ?? "Insira o conteudo aqui"}
          </div>
        </div>

        <footer className="modal-footer">
          {shouldShowGhost ? (
            <button
              type="button"
              className="modal-action modal-action-ghost"
              onClick={ghostAction.onClick}
              disabled={ghostAction.disabled}
            >
              {ghostAction.label}
            </button>
          ) : null}
          {outlinedAction ? (
            <button
              type="button"
              className="modal-action modal-action-outlined"
              onClick={outlinedAction.onClick}
              disabled={outlinedAction.disabled}
            >
              {outlinedAction.label}
            </button>
          ) : null}
          {primaryAction ? (
            <button
              type="button"
              className="modal-action modal-action-primary"
              onClick={primaryAction.onClick}
              disabled={primaryAction.disabled}
            >
              {primaryAction.label}
            </button>
          ) : null}
        </footer>
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
