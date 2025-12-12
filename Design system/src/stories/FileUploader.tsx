import { useId, useMemo, useRef, useState } from "react";
import "./FileUploader.css";

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

  const formattedFiles = useMemo(
    () =>
      files.map((file) => ({
        file,
        readableSize: formatFileSize(file.size),
      })),
    [files],
  );

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
    <div className="fu-root" data-state={visualState}>
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
          {visualState === "uploaded" ? <CheckIcon /> : <UploadIcon />}
        </div>

        <div className="fu-content">
          <p className="fu-title">{title}</p>
          <p className="fu-description">{description}</p>

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
        <div className="fu-filelist" aria-live="polite">
          {formattedFiles.map(({ file, readableSize }, index) => (
            <div className="fu-file" key={`${file.name}-${index}`}>
              <div className="fu-file-info">
                <span className="fu-file-icon" aria-hidden="true">
                  <FileIcon />
                </span>

                <div>
                  <div className="fu-filename">{file.name}</div>
                  {readableSize ? (
                    <div className="fu-filesize">{readableSize}</div>
                  ) : null}
                </div>
              </div>

              {onRemove && (
                <button
                  type="button"
                  className="fu-remove"
                  onClick={() => onRemove(index)}
                  aria-label={`Remover ${file.name}`}
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

/* =========================
   Helpers
========================= */

function formatFileSize(bytes: number | undefined) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let size = bytes / 1024;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  const rounded = size >= 10 ? size.toFixed(0) : size.toFixed(1);
  return `${rounded} ${units[unitIndex]}`;
}

const UploadIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="24" fill="#EEF4FF" />
    <path
      d="M24 14v17"
      stroke="#0055FF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m17 21 7-7 7 7"
      stroke="#0055FF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 32h16"
      stroke="#0055FF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="24" fill="#EAFBF2" />
    <path
      d="m17.5 24 4.5 4.5 8.5-9"
      stroke="#12A454"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    width="28"
    height="32"
    viewBox="0 0 28 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 2h12l6 6v22a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
      fill="#EEF2FF"
      stroke="#CBD5F5"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M17 2v6h6"
      stroke="#CBD5F5"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8 18h12M8 22h10"
      stroke="#7C8CBF"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
