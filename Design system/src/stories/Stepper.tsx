import { useMemo, useState } from "react";
import "./Stepper.css";

export type StepperStatus = "completed" | "current" | "upcoming" | "error";
export type StepperSize = "sm" | "md" | "lg";

export type StepperStep = {
  id: string;
  label: string;
  status?: StepperStatus;
};

export type StepperProps = {
  id?: string;
  steps: StepperStep[];
  activeStep?: number;
  size?: StepperSize;
};

export function Stepper({
  id,
  steps,
  activeStep,
  size = "md",
}: StepperProps) {
  const maxVisible = 4;
  const [startIndex, setStartIndex] = useState(0);
  const resolvedSteps = steps.map((step, index) => {
    if (step.status) return step.status;
    if (activeStep === undefined) return "upcoming";
    if (index < activeStep) return "completed";
    if (index === activeStep) return "current";
    return "upcoming";
  });

  const endIndex = Math.min(startIndex + maxVisible, steps.length);
  const visibleSteps = useMemo(
    () => steps.slice(startIndex, endIndex),
    [steps, startIndex, endIndex],
  );

  const canGoPrev = startIndex > 0;
  const canGoNext = endIndex < steps.length;

  return (
    <div className="stepper-shell">
      <button
        type="button"
        className={[
          "stepper-nav",
          "stepper-prev",
          !canGoPrev ? "stepper-nav--disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
        disabled={!canGoPrev}
        aria-label="Mostrar passos anteriores"
      >
        <ArrowIcon direction="left" />
      </button>
      <ol
        id={id}
        className={["stepper-root", `stepper-${size}`].join(" ")}
      >
        {visibleSteps.map((step, visibleIndex) => {
          const index = startIndex + visibleIndex;
          const status = resolvedSteps[index];
          const isLast = index === steps.length - 1;
          const isLastVisible = visibleIndex === visibleSteps.length - 1;
          return (
            <li
              key={step.id}
              className={["stepper-step", `stepper-${status}`].join(" ")}
              aria-current={status === "current" ? "step" : undefined}
            >
              <div className="stepper-marker" aria-hidden="true">
                {status === "completed" ? (
                  <svg width="16" height="16" viewBox="0 0 20 20">
                    <path
                      d="M6 10.2 8.6 13 14 7.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : status === "error" ? (
                  <svg width="16" height="16" viewBox="0 0 20 20">
                    <path
                      d="M10 6.2v5.1M10 14.2h.01"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="stepper-index">{index + 1}</span>
                )}
              </div>
              <div className="stepper-text">
                <div className="stepper-label">{step.label}</div>
              </div>
              {!isLast && !isLastVisible ? (
                <span className="stepper-connector" aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        className={[
          "stepper-nav",
          "stepper-next",
          !canGoNext ? "stepper-nav--disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() =>
          setStartIndex((prev) =>
            Math.min(steps.length - maxVisible, prev + 1),
          )
        }
        disabled={!canGoNext}
        aria-label="Mostrar proximos passos"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const path =
    direction === "left"
      ? "M12 15L7 10L12 5"
      : "M8 5L13 10L8 15";
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
