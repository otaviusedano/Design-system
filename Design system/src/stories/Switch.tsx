import { useId, useState } from "react";
import "./Switch.css";

export type SwitchProps = {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({
  id,
  label = "Label",
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? `switch-${autoId}`;

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const currentChecked = isControlled ? checked! : internalChecked;

  function toggle(nextValue: boolean) {
    if (!isControlled) {
      setInternalChecked(nextValue);
    }
    onCheckedChange?.(nextValue);
  }

  return (
    <label
      htmlFor={inputId}
      className={[
        "sw-root",
        currentChecked ? "sw-checked" : "",
        disabled ? "sw-disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={currentChecked ? "checked" : "unchecked"}
    >
      <div className="sw-control">
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          aria-checked={currentChecked}
          checked={currentChecked}
          disabled={disabled}
          className="sw-input"
          onChange={(event) => toggle(event.target.checked)}
        />
        <span className="sw-slider" aria-hidden="true">
          <span className="sw-thumb" />
        </span>
      </div>
      <span className="sw-label">{label}</span>
    </label>
  );
}
