import { useMemo, useState, type ReactNode } from "react";
import "./Tabs.css";

export type TabsSize = "sm" | "md" | "lg";
export type TabItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
};

export type TabsProps = {
  id?: string;
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  size?: TabsSize;
  onValueChange?: (value: string) => void;
};

export function Tabs({
  id,
  items,
  value,
  defaultValue,
  size = "md",
  onValueChange,
}: TabsProps) {
  const firstEnabled = useMemo(
    () => items[0]?.id,
    [items],
  );
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? firstEnabled ?? "",
  );
  const activeValue = isControlled ? (value as string) : internalValue;

  function handleChange(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  return (
    <div
      id={id}
      className={[
        "tabs-root",
        `tabs-${size}`,
      ].join(" ")}
    >
      <div className="tabs-list" role="tablist" aria-label="Tabs">
        {items.map((item) => {
          const isActive = item.id === activeValue;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${item.id}`}
              className={[
                "tabs-trigger",
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleChange(item.id)}
            >
              {item.icon ? <span className="tabs-icon">{item.icon}</span> : null}
              <span className="tabs-label">{item.label}</span>
              {item.badge ? (
                <span className="tabs-badge">{item.badge}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
