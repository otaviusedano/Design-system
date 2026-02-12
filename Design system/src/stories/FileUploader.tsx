import "./FileUploader.css";

/* =========================
   Types (inline)
========================= */

export type FileUploaderState = "default" | "focus" | "uploaded" | "error";

export type FileUploaderProps = {
  className?: string;
  state?: FileUploaderState;
  actionText?: string;
  helperText?: string;
  errorText?: string;
  fileName?: string;
  successText?: string;
  onRemove?: () => void;
};

/* =========================
   Component
========================= */

export function FileUploader({
  state = "default",
  className,
  actionText = "clique para selecionar",
  helperText = "Deve ter no máximo 25mb e ser PNG ou JPEG",
  errorText = "Arquivo muito grande ou não é PNG ou JPEG",
  fileName = "RG_FRENTE.PNG",
  successText = "Arquivo enviado com sucesso",
  onRemove,
}: FileUploaderProps) {
  const containerClassName = [
    "storybook-file-uploader",
    `storybook-file-uploader--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClassName}>
      <div className="storybook-file-uploader__icon" aria-hidden="true">
        <i
          className={`fa-solid ${
            state === "error"
              ? "fa-xmark"
              : state === "uploaded"
                ? "fa-check"
                : "fa-upload"
          }`}
          aria-hidden
        />
      </div>

      <div className="storybook-file-uploader__content">
        {state !== "uploaded" ? (
          <>
            <span className="storybook-file-uploader__action">{actionText}</span>
            <span className="storybook-file-uploader__helper">
              {state === "error" ? errorText : helperText}
            </span>
          </>
        ) : (
          <>
            <div className="storybook-file-uploader__file">
              <span className="storybook-file-uploader__filename">
                {fileName}
              </span>
              {onRemove ? (
                <button
                  type="button"
                  className="storybook-file-uploader__remove"
                  onClick={onRemove}
                  aria-label="Remover arquivo"
                >
                  <i className="fa-solid fa-xmark" aria-hidden />
                </button>
              ) : (
                <span className="storybook-file-uploader__remove" aria-hidden>
                  <i className="fa-solid fa-xmark" aria-hidden />
                </span>
              )}
            </div>
            <span className="storybook-file-uploader__success">
              {successText}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
