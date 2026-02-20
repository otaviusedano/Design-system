import { useId, useState } from "react";
import "./Switch.css";

export type SwitchProps = {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({
  id,
  label = "Label",
  checked,
  defaultChecked,
  disabled,
  autoFocus,
  onCheckedChange,
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? `switch-${autoId}`;
  const [isFocusVisible, setIsFocusVisible] = useState(false);

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
        isFocusVisible ? "sw-focus" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-state={currentChecked ? "checked" : "unchecked"}
      data-disabled={disabled ? "true" : "false"}
    >
      <span className="sw-control">
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          aria-checked={currentChecked}
          checked={currentChecked}
          disabled={disabled}
          className="sw-input"
          autoFocus={autoFocus}
          onFocus={() => setIsFocusVisible(true)}
          onBlur={() => setIsFocusVisible(false)}
          onChange={(event) => toggle(event.target.checked)}
        />
        <span className="sw-track" aria-hidden="true">
          <span className="sw-thumb" />
        </span>
      </span>
      <span className="sw-label">{label}</span>
    </label>
  );
}
