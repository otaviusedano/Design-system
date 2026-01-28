import "./Divider.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSize = "sm" | "md" | "lg";
export type DividerVariant = "solid" | "dashed";
export type DividerTone = "default" | "muted" | "strong";
export type DividerAlign = "start" | "center" | "end";

export type DividerProps = {
  id?: string;
  orientation?: DividerOrientation;
  size?: DividerSize;
  variant?: DividerVariant;
  tone?: DividerTone;
  label?: string;
  align?: DividerAlign;
};

export function Divider({
  id,
  orientation = "horizontal",
  size = "md",
  variant = "solid",
  tone = "default",
  label,
  align = "center",
}: DividerProps) {
  const showLabel = Boolean(label) && orientation === "horizontal";

  return (
    <div
      id={id}
      className={[
        "divider",
        `divider-${orientation}`,
        `divider-${size}`,
        `divider-${variant}`,
        `divider-${tone}`,
        showLabel ? "divider-with-label" : "",
        `divider-align-${align}`,
      ].join(" ")}
      role="separator"
      aria-orientation={orientation}
    >
      <span className="divider-line" aria-hidden="true" />
      {showLabel ? <span className="divider-label">{label}</span> : null}
      {showLabel ? <span className="divider-line" aria-hidden="true" /> : null}
    </div>
  );
}
