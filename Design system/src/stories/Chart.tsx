import "./chart.css";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";

type ChartKind = "line" | "bar" | "circle";
type ChartVariation = "simple" | "type" | "multi" | "multi-type";
type ChartSize = "default" | "sm" | "md";

type ChartSeries = {
  name: string;
  color: string;
  values: number[];
};

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const Y_AXIS = [30, 25, 20, 15, 10, 5, 0];

export type ChartProps = {
  className?: string;
  variation?: ChartVariation;
  type?: ChartKind;
  size?: ChartSize;
  showLegend?: boolean;
  withInfoRight?: boolean;
};

function getSeries(variation: ChartVariation, type: ChartKind): ChartSeries[] {
  if (type === "circle") {
    return [
      { name: "Item 1", color: "#56F56C", values: [32] },
      { name: "Item 2", color: "#626295", values: [16] },
      { name: "Item 3", color: "#4DD9FF", values: [20] },
      { name: "Item 4", color: "#F34040", values: [10] },
      { name: "Item 5", color: "#9864E2", values: [22] },
    ];
  }

  if (variation === "simple") {
    return [
      {
        name: "Item 1",
        color: "#56F56C",
        values: [18, 14, 10, 17, 20, 15, 9, 11, 5, 13, 16, 21],
      },
    ];
  }

  if (variation === "type") {
    return [
      {
        name: "Item 1",
        color: "#56F56C",
        values: [16, 11, 9, 14, 17, 12, 8, 10, 4, 9, 12, 16],
      },
      {
        name: "Item 2",
        color: "#F34040",
        values: [4, 4, 4, 4, 5, 4, 3, 3, 2, 3, 4, 4],
      },
    ];
  }

  if (variation === "multi") {
    return [
      {
        name: "Item 1",
        color: "#56F56C",
        values: [16, 11, 9, 14, 17, 12, 8, 10, 4, 9, 12, 16],
      },
      {
        name: "Item 2",
        color: "#F34040",
        values: [4, 4, 4, 4, 5, 4, 3, 3, 2, 3, 4, 4],
      },
      {
        name: "Item 3",
        color: "#626295",
        values: [6, 4, 3, 5, 6, 4, 3, 4, 1, 4, 5, 6],
      },
    ];
  }

  return [
    {
      name: "Item 1",
      color: "#56F56C",
      values: [12, 18, 23, 16, 9, 8, 11, 14, 18, 19, 20, 22],
    },
    {
      name: "Item 2",
      color: "#F34040",
      values: [6, 7, 7, 6, 5, 4, 4, 5, 6, 6, 6, 6],
    },
    {
      name: "Item 3",
      color: "#626295",
      values: [4, 5, 6, 8, 11, 12, 13, 12, 11, 10, 9, 8],
    },
    {
      name: "Item 4",
      color: "#4DD9FF",
      values: [1, 1, 2, 2, 3, 5, 6, 7, 6, 4, 3, 2],
    },
  ];
}

function toPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const cp1x = current.x + (next.x - current.x) / 3;
    const cp2x = current.x + ((next.x - current.x) * 2) / 3;
    path += ` C ${cp1x} ${current.y}, ${cp2x} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

function arcPath(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

export function Chart({
  className,
  variation = "simple",
  type = "bar",
  size = "default",
  showLegend = true,
  withInfoRight = true,
}: ChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

  const series = getSeries(variation, type);
  const isCircle = type === "circle";
  const chartWidth = variation === "multi" || variation === "multi-type" ? 640 : 500;
  const chartHeight = 172;
  const innerWidth = chartWidth - 58;
  const innerHeight = 136;
  const xStep = innerWidth / (MONTHS.length - 1);
  const yForValue = (value: number) => chartHeight - (value / 30) * innerHeight;

  if (isCircle) {
    const sizePx = size === "sm" ? 180 : 240;
    const radius = size === "sm" ? 84 : 112;
    const center = sizePx / 2;
    const total = series.reduce((sum, item) => sum + item.values[0], 0);
    let currentAngle = -90;

    return (
      <div className={["chart-root", "chart-circle-layout", className ?? ""].filter(Boolean).join(" ")}>
        <div className={["chart-circle-content", withInfoRight ? "chart-circle-content-row" : ""].join(" ")}>
          <svg width={sizePx} height={sizePx} viewBox={`0 0 ${sizePx} ${sizePx}`} className="chart-svg">
            {series.map((slice, index) => {
              const angle = (slice.values[0] / total) * 360;
              const path = arcPath(center, center, radius, currentAngle, currentAngle + angle);
              currentAngle += angle;
              return <path key={`${slice.name}-${index}`} d={path} fill={slice.color} />;
            })}
          </svg>
          {showLegend && (
            <div className={["chart-legend", withInfoRight ? "chart-legend-column" : "chart-legend-center"].join(" ")}>
              {series.map((item) => (
                <div key={item.name} className="chart-legend-item">
                  <span className="chart-legend-swatch" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const stackedSums = MONTHS.map((_, monthIndex) =>
    series.reduce((sum, item) => sum + item.values[monthIndex], 0),
  );
  const isBarMode = type === "bar" && variation !== "multi-type";

  function handleBarHover(monthIndex: number, event: MouseEvent<SVGRectElement>) {
    const rootBounds = rootRef.current?.getBoundingClientRect();
    if (!rootBounds) return;

    setHoveredMonthIndex(monthIndex);
    setTooltipPosition({
      x: event.clientX - rootBounds.left + 8,
      y: event.clientY - rootBounds.top - 12,
    });
  }

  return (
    <div
      ref={rootRef}
      className={[
        "chart-root",
        chartWidth === 640 ? "chart-root-wide" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="chart-plot-wrap">
        <div className="chart-y-axis">
          {Y_AXIS.map((tick) => (
            <span key={tick}>{tick}%</span>
          ))}
        </div>
        <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="chart-svg">
          {Y_AXIS.map((tick) => {
            const y = yForValue(tick);
            return <line key={tick} x1={0} y1={y} x2={chartWidth} y2={y} className="chart-grid" />;
          })}

          {type === "bar" && variation !== "multi-type" &&
            MONTHS.map((month, monthIndex) => {
              const barWidth = variation === "multi" ? 28 : 24;
              const x = monthIndex * xStep - barWidth / 2;
              let accumulatedHeight = 0;

              return (
                <g key={month}>
                  {series.map((item, index) => {
                    const value = item.values[monthIndex];
                    const pixelHeight = (value / 30) * innerHeight;
                    const y = chartHeight - accumulatedHeight - pixelHeight;
                    accumulatedHeight += pixelHeight;
                    return (
                      <rect
                        key={`${month}-${item.name}`}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={pixelHeight}
                        rx={index === series.length - 1 ? 4 : 0}
                        fill={item.color}
                        onMouseEnter={(event) => handleBarHover(monthIndex, event)}
                        onMouseMove={(event) => handleBarHover(monthIndex, event)}
                        onMouseLeave={() => {
                          setHoveredMonthIndex(null);
                          setTooltipPosition(null);
                        }}
                      />
                    );
                  })}
                  {withInfoRight && variation === "simple" && (
                    <text x={monthIndex * xStep} y={yForValue(stackedSums[monthIndex]) - 6} className="chart-top-value">
                      {Math.round((stackedSums[monthIndex] / 30) * 100)}%
                    </text>
                  )}
                </g>
              );
            })}

          {(type === "line" || variation === "multi-type") &&
            series.map((item) => {
              const points = item.values.map((value, index) => ({
                x: index * xStep,
                y: yForValue(value),
              }));
              const linePath = toPath(points);
              const lastPoint = points[points.length - 1];
              const firstPoint = points[0];
              const areaPath = `${linePath} L ${lastPoint?.x ?? 0} ${chartHeight} L ${firstPoint?.x ?? 0} ${chartHeight} Z`;

              return (
                <g key={item.name}>
                  <path d={areaPath} fill={item.color} fillOpacity={variation === "multi-type" ? 0.9 : 0.3} />
                  <path d={linePath} fill="none" stroke={item.color} strokeWidth={variation === "multi-type" ? 1 : 3} />
                </g>
              );
            })}
        </svg>
      </div>

      <div className="chart-months">
        {MONTHS.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      {showLegend && (
        <div className="chart-legend">
          {series.map((item) => (
            <div key={item.name} className="chart-legend-item">
              <span className="chart-legend-swatch" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {isBarMode && hoveredMonthIndex !== null && tooltipPosition && (
        <div
          className="chart-tooltip"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
        >
          <div className="chart-tooltip-title">{MONTHS[hoveredMonthIndex]}</div>
          <div className="chart-tooltip-list">
            {series.map((item) => (
              <div key={`${item.name}-${hoveredMonthIndex}`} className="chart-tooltip-item">
                <span className="chart-legend-swatch" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
                <strong>{item.values[hoveredMonthIndex]}%</strong>
              </div>
            ))}
          </div>
          <div className="chart-tooltip-total">
            Total: <strong>{stackedSums[hoveredMonthIndex]}%</strong>
          </div>
        </div>
      )}
    </div>
  );
}
