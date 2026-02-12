import "./Toast.css";

export type ToastState = "success" | "error";
export type ToastDevice = "desktop" | "mobile";

export type ToastProps = {
  id?: string;
  className?: string;
  state?: ToastState;
  device?: ToastDevice;
  title: string;
  dismissLabel?: string;
  onDismiss?: () => void;
};

export function Toast({
  id,
  state = "success",
  device = "desktop",
  title,
  dismissLabel = "Fechar",
  onDismiss,
  className,
}: ToastProps) {
  const showDismiss = Boolean(onDismiss);
  const containerClassName = [
    "storybook-toast",
    `storybook-toast--${state}`,
    `storybook-toast--${device}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id={id}
      className={containerClassName}
      role={state === "error" ? "alert" : "status"}
      aria-live={state === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <span className="storybook-toast__text">{title}</span>
      {showDismiss ? (
        <button
          type="button"
          className="storybook-toast__dismiss"
          onClick={onDismiss}
          aria-label={dismissLabel}
        >
          <i className="fa-light fa-xmark" aria-hidden />
        </button>
      ) : (
        <span className="storybook-toast__dismiss" aria-hidden>
          <i className="fa-light fa-xmark" aria-hidden />
        </span>
      )}
    </div>
  );
}
