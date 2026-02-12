import { useEffect, useMemo, useState } from "react";
import "./Stepper.css";

type StepperDevice = "desktop" | "mobile";
type StepperState = "completed" | "current" | "upcoming";

export type StepperProps = {
  id?: string;
  totalSteps?: number;
  currentStep?: number;
  device?: StepperDevice;
  stepLabel?: string;
};

export function Stepper({
  id,
  totalSteps = 4,
  currentStep = 1,
  device = "desktop",
  stepLabel = "Etapa",
}: StepperProps) {
  const safeTotalSteps = Math.max(2, totalSteps);
  const safeCurrentStep = Math.min(Math.max(1, currentStep), safeTotalSteps);
  const maxVisible = device === "mobile" ? 2 : 4;
  const visibleCount = Math.min(maxVisible, safeTotalSteps);
  const maxStart = Math.max(0, safeTotalSteps - visibleCount);

  const [startIndex, setStartIndex] = useState(() =>
    clampStart(safeCurrentStep - visibleCount, maxStart),
  );

  useEffect(() => {
    setStartIndex((prev) => {
      const clampedPrev = clampStart(prev, maxStart);
      const currentIndex = safeCurrentStep - 1;
      if (currentIndex < clampedPrev) {
        return currentIndex;
      }
      if (currentIndex >= clampedPrev + visibleCount) {
        return clampStart(currentIndex - visibleCount + 1, maxStart);
      }
      return clampedPrev;
    });
  }, [safeCurrentStep, maxStart, visibleCount]);

  const visibleSteps = useMemo(
    () =>
      Array.from({ length: visibleCount }, (_, offset) => {
        const index = startIndex + offset;
        const state: StepperState =
          index < safeCurrentStep - 1
            ? "completed"
            : index === safeCurrentStep - 1
              ? "current"
              : "upcoming";
        return { index, number: index + 1, state };
      }),
    [safeCurrentStep, startIndex, visibleCount],
  );

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStart;

  return (
    <div
      className={[
        "stepper-shell",
        device === "mobile" ? "stepper-shell--mobile" : "stepper-shell--desktop",
      ].join(" ")}
    >
      <NavButton
        direction="left"
        disabled={!canGoPrev}
        onClick={() => setStartIndex((prev) => clampStart(prev - 1, maxStart))}
      />
      <ol id={id} className="stepper-track">
        {visibleSteps.map((step) => {
          const isFirst = step.index === 0;
          const isLast = step.index === safeTotalSteps - 1;
          const leftLine =
            isFirst
              ? "transparent"
              : step.state === "upcoming"
                ? "default"
                : "success";
          const rightLine =
            isLast
              ? "transparent"
              : step.state === "completed"
                ? "success"
                : "default";

          return (
            <li
              key={step.number}
              className={["stepper-step", `stepper-step--${step.state}`].join(" ")}
              aria-current={step.state === "current" ? "step" : undefined}
            >
              <div className="stepper-step__line">
                <span
                  className={[
                    "stepper-step__segment",
                    `stepper-step__segment--${leftLine}`,
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span className="stepper-step__marker" aria-hidden="true">
                  {step.state === "completed" ? (
                    <CheckIcon />
                  ) : (
                    <span className="stepper-step__index">{step.number}</span>
                  )}
                </span>
                <span
                  className={[
                    "stepper-step__segment",
                    `stepper-step__segment--${rightLine}`,
                  ].join(" ")}
                  aria-hidden="true"
                />
              </div>
              <span className="stepper-step__label">{stepLabel}</span>
            </li>
          );
        })}
      </ol>
      <NavButton
        direction="right"
        disabled={!canGoNext}
        onClick={() => setStartIndex((prev) => clampStart(prev + 1, maxStart))}
      />
    </div>
  );
}

function clampStart(value: number, maxStart: number): number {
  return Math.min(Math.max(value, 0), maxStart);
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={[
        "stepper-nav",
        disabled ? "stepper-nav--disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled}
      aria-label={
        direction === "left"
          ? "Mostrar passos anteriores"
          : "Mostrar próximos passos"
      }
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 18L9 12L15 6" : "M9 6L15 12L9 18"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path
        d="M8.1 12.2L10.7 14.8L16 9.6"
        fill="none"
        stroke="var(--icon-invert)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
