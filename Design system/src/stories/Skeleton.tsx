import type { CSSProperties } from "react";
import "./Skeleton.css";

export type SkeletonVariant = "text" | "rect";
export type SkeletonSize = "sm" | "md" | "lg";
export type SkeletonAnimation = "pulse" | "shimmer" | "none";

export type SkeletonProps = {
  id?: string;
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  count?: number;
  gap?: number;
};

const textHeights: Record<SkeletonSize, number> = {
  sm: 10,
  md: 30,
  lg: 90,
};

const rectHeights: Record<SkeletonSize, number> = {
  sm: 32,
  md: 96,
  lg: 288,
};


const textRadius: Record<SkeletonSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
};

const rectRadius: Record<SkeletonSize, number> = {
  sm: 8,
  md: 12,
  lg: 14,
};

const resolveSizeValue = (value?: number | string) => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

export function Skeleton({
  id,
  variant = "text",
  size = "md",
  animation = "pulse",
  width,
  height,
  radius,
  count = 1,
  gap = 10,
}: SkeletonProps) {
  const baseHeight =
    variant === "text"
      ? textHeights[size]
      : rectHeights[size];

  const resolvedHeight = resolveSizeValue(height ?? baseHeight);
  const resolvedWidth =
    resolveSizeValue(width) ?? "100%";
  const resolvedRadius =
    resolveSizeValue(radius) ??
    (variant === "text"
      ? `${textRadius[size]}px`
      : `${rectRadius[size]}px`);

  const items = Array.from({ length: Math.max(1, count) });
  const rootStyle = { "--sk-gap": `${gap}px` } as CSSProperties;

  return (
    <div
      id={id}
      className={[
        "sk-root",
        `sk-${variant}`,
        `sk-${size}`,
        animation !== "none" ? `sk-${animation}` : "",
      ].join(" ")}
      style={rootStyle}
      aria-hidden="true"
    >
      {items.map((_, index) => (
        <span
          key={`sk-${index}`}
          className="sk-item"
          style={
            {
              "--sk-width": resolvedWidth,
              "--sk-height": resolvedHeight,
              "--sk-radius": resolvedRadius,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
