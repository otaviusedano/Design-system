import { useId, useMemo, useRef, useState } from "react";
import "./FileUploader.css";

/* =========================
   Upload icon (Figma-style)
========================= */

const UploadIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M24 32V16m0 0l-6 6m6-6l6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 32v4a4 4 0 004 4h24a4 4 0 004-4v-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* =========================
   Types (inline)
========================= */

export type FileUploaderState =
  | "default"
  | "focus"
  | "uploaded"
  | "error"
  | "disabled";

export type FileUploaderProps = {
  id?: string;
  state?: FileUploaderState;

  title?: string;
  description?: string;
  buttonLabel?: string;

  helperText?: string;
  errorText?: string;

  accept?: string;
  multiple?: boolean;

  value?: File[];
  onChange?: (files: File[]) => void;
  onRemove?: (index: number) => void;
};

/* =========================
   Component
========================= */

export function FileUploader({
  id,
  state = "default",
  title = "Arraste e solte o arquivo aqui",
  description = "ou selecione um arquivo do seu computador",
  buttonLabel = "Selecionar arquivo",
  helperText,
  errorText,
  accept,
  multiple,
  value,
  onChange,
  onRemove,
}: FileUploaderProps) {
  const autoId = useId();
  const inputId = id ?? `file-uploader-${autoId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isDragOver, setIsDragOver] = useState(false);

  const files = value ?? [];
  const hasFiles = files.length > 0;

  const visualState = useMemo<FileUploaderState>(() => {
    if (state === "disabled") return "disabled";
    if (state === "error") return "error";
    if (state === "focus") return "focus";
    if (hasFiles) return "uploaded";
    return "default";
  }, [state, hasFiles]);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list);
    onChange?.(multiple ? next : next.slice(0, 1));
  }

  function openPicker() {
    if (visualState === "disabled") return;
    inputRef.current?.click();
  }

  return (
    <div className="fu-root">
      <div
        className={[
          "fu-dropzone",
          `fu-${visualState}`,
          isDragOver ? "fu-dragover" : "",
        ].join(" ")}
        role="button"
        tabIndex={visualState === "disabled" ? -1 : 0}
        aria-disabled={visualState === "disabled"}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (visualState === "disabled") return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          if (visualState !== "disabled") setIsDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (visualState !== "disabled") setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (visualState !== "disabled") {
            handleFiles(e.dataTransfer.files);
          }
        }}
      >
        <div className="fu-icon" aria-hidden="true">
          <UploadIcon />
        </div>

        <div className="fu-content">
          <div className="fu-title">{title}</div>
          <div className="fu-description">{description}</div>

          <button
            type="button"
            className="fu-button"
            onClick={(e) => {
              e.stopPropagation();
              openPicker();
            }}
            disabled={visualState === "disabled"}
          >
            {buttonLabel}
          </button>

          {visualState === "error" && errorText ? (
            <div className="fu-helper fu-error">{errorText}</div>
          ) : helperText ? (
            <div className="fu-helper">{helperText}</div>
          ) : null}
        </div>

        <input
          ref={inputRef}
          id={inputId}
          className="fu-input"
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={visualState === "disabled"}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {hasFiles && (
        <div className="fu-filelist">
          {files.map((file, index) => (
            <div className="fu-file" key={`${file.name}-${index}`}>
              <span className="fu-filename">{file.name}</span>

              {onRemove && (
                <button
                  type="button"
                  className="fu-remove"
                  onClick={() => onRemove(index)}
                >
                  Remover
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
