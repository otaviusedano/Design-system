import React, { useState } from 'react';

import './chart.css';

export type ChartType = 'line' | 'bar' | 'area' | 'pie';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  title?: string;
  data: ChartDataPoint[];
  type?: ChartType;
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  showYAxis?: boolean;
  color?: string;
  onClick?: (dataPoint: ChartDataPoint, index: number) => void;
}

export const Chart = ({
  title,
  data,
  type = 'line',
  height = 200,
  showGrid = true,
  showLabels = true,
  showYAxis = false,
  color = '#1a1a6b',
  onClick,
}: ChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number; alignRight?: boolean } | null>(null);

  if (!data || data.length === 0) {
    return null;
  }

  // Pie chart logic
  if (type === 'pie') {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const pieSize = 240;
    const centerX = pieSize / 2;
    const centerY = pieSize / 2;
    const radius = pieSize / 2 - 20;
    let currentAngle = -90; // Start from top

    const pieSlices = data.map((point, index) => {
      const percentage = point.value / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;

      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      currentAngle += angle;

      return (
        <g key={`slice-${index}`}>
          <path
            d={pathData}
            fill={point.color || color}
            className="storybook-chart__pie-slice"
            onClick={() => onClick?.(point, index)}
            onMouseEnter={(e) => {
              setHoveredIndex(index);
              const containerRect = e.currentTarget.closest('.storybook-chart__pie-chart')?.getBoundingClientRect();
              if (containerRect) {
                // Nos últimos 4 itens, tooltip à esquerda
                const isLastFour = index >= data.length - 4;
                const tooltipWidth = 200; // min-width do tooltip
                const offset = isLastFour ? -(tooltipWidth + 8) : 8;
                
                setTooltipPosition({
                  x: e.clientX - containerRect.left + offset,
                  y: e.clientY - containerRect.top,
                  alignRight: isLastFour,
                });
              }
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setTooltipPosition(null);
            }}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
          />
        </g>
      );
    });

    const showLegend = data.length >= 2;
    const formatValue = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    const getCurrentDate = () => {
      return new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    };

    return (
      <div className="storybook-chart">
        {title && <h3 className="storybook-chart__title">{title}</h3>}
        <div className="storybook-chart__pie-wrapper">
          <div className="storybook-chart__pie-chart" style={{ position: 'relative' }}>
            <svg
              width={pieSize}
              height={pieSize}
              viewBox={`0 0 ${pieSize} ${pieSize}`}
              className="storybook-chart__svg"
            >
              {pieSlices}
            </svg>
            {hoveredIndex !== null && tooltipPosition && (
              <div
                className={[
                  'storybook-chart__tooltip',
                  tooltipPosition.alignRight ? 'storybook-chart__tooltip--left' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  left: `${tooltipPosition.x}px`,
                  top: `${tooltipPosition.y}px`,
                }}
              >
                <div className="storybook-chart__tooltip-date">{getCurrentDate()}</div>
                <div className="storybook-chart__tooltip-items">
                  {data.map((point, index) => (
                    <div
                      key={`tooltip-${index}`}
                      className="storybook-chart__tooltip-item"
                      style={{
                        opacity: hoveredIndex === index ? 1 : 0.5,
                      }}
                    >
                      <div
                        className="storybook-chart__tooltip-color"
                        style={{ backgroundColor: point.color || color }}
                      />
                      <span className="storybook-chart__tooltip-value">
                        {formatValue(point.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {showLegend && (
            <div className="storybook-chart__legend storybook-chart__legend--horizontal">
              {data.map((point, index) => (
                <div
                  key={`legend-${index}`}
                  className="storybook-chart__legend-item"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTooltipPosition(null);
                  }}
                  style={{
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1,
                  }}
                >
                  <div
                    className="storybook-chart__legend-color"
                    style={{ backgroundColor: point.color || color }}
                  />
                  <span className="storybook-chart__legend-label">{point.label}</span>
                  <span className="storybook-chart__legend-value">
                    {((point.value / total) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Line, Bar, Area chart logic
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const yAxisPadding = showYAxis ? 50 : 40;
  const padding = 40;
  const chartWidth = 600;
  const chartHeight = height;
  const innerWidth = chartWidth - padding - yAxisPadding;
  const innerHeight = chartHeight - padding * 2;

  const getX = (index: number) => {
    const divisor = data.length > 1 ? data.length - 1 : 1;
    return yAxisPadding + (index / divisor) * innerWidth;
  };

  const getY = (value: number) => {
    return padding + innerHeight - ((value - minValue) / range) * innerHeight;
  };

  // Smooth line using cubic bezier curves
  const createSmoothPath = () => {
    if (data.length < 2) return '';
    
    const points = data.map((point, index) => ({
      x: getX(index),
      y: getY(point.value),
    }));

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      const cp1x = current.x + (next.x - current.x) / 3;
      const cp1y = current.y;
      const cp2x = current.x + (next.x - current.x) * 2 / 3;
      const cp2y = next.y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  const smoothLinePath = createSmoothPath();
  const areaPath = `${smoothLinePath} L ${getX(data.length - 1)} ${padding + innerHeight} L ${getX(0)} ${padding + innerHeight} Z`;

  const gridLines = showGrid
    ? Array.from({ length: 5 }, (_, i) => {
        const y = padding + (innerHeight / 4) * i;
        return (
          <line
            key={`grid-${i}`}
            x1={yAxisPadding}
            y1={y}
            x2={yAxisPadding + innerWidth}
            y2={y}
            className="storybook-chart__grid-line"
          />
        );
      })
    : null;

  const yAxisLabels = showYAxis
    ? Array.from({ length: 5 }, (_, i) => {
        const value = maxValue - (range / 4) * i;
        const y = padding + (innerHeight / 4) * i;
        const displayValue = value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toFixed(0);
        return (
          <text
            key={`y-label-${i}`}
            x={yAxisPadding - 10}
            y={y}
            className="storybook-chart__y-axis-label"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {displayValue}
          </text>
        );
      })
    : null;

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleMouseEnter = (index: number, event: React.MouseEvent<SVGElement>) => {
    setHoveredIndex(index);
    const containerRect = event.currentTarget.closest('.storybook-chart__container')?.getBoundingClientRect();
    if (containerRect) {
      // Nos últimos 4 pontos, tooltip à esquerda
      const isLastFour = index >= data.length - 4;
      const tooltipWidth = 200; // min-width do tooltip
      const offset = isLastFour ? -(tooltipWidth + 8) : 8;
      
      setTooltipPosition({
        x: event.clientX - containerRect.left + offset,
        y: event.clientY - containerRect.top,
        alignRight: isLastFour,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setTooltipPosition(null);
  };

  return (
    <div className="storybook-chart">
      {title && <h3 className="storybook-chart__title">{title}</h3>}
      <div className="storybook-chart__container" style={{ position: 'relative' }}>
        <svg
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="storybook-chart__svg"
        >
          {yAxisLabels}
          {gridLines}
          {type === 'area' && (
            <path
              d={areaPath}
              className="storybook-chart__area"
              fill={color}
              fillOpacity="0.1"
            />
          )}
          {type === 'line' || type === 'area' ? (
            <path
              d={smoothLinePath}
              className="storybook-chart__line"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          ) : null}
          {type === 'bar' &&
            data.map((point, index) => {
              const x = getX(index);
              const y = getY(point.value);
              const barWidth = innerWidth / data.length - 4;
              const barHeight = innerHeight - (y - padding);
              return (
                <rect
                  key={`bar-${index}`}
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  className="storybook-chart__bar"
                  fill={color}
                  onClick={() => onClick?.(point, index)}
                  onMouseEnter={(e) => handleMouseEnter(index, e)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          {/* Invisible hover areas for line charts */}
          {type === 'line' || type === 'area'
            ? data.map((point, index) => {
                const x = getX(index);
                const y = getY(point.value);
                const nextX = index < data.length - 1 ? getX(index + 1) : x;
                const hoverWidth = index < data.length - 1 ? (nextX - x) / 2 : 20;
                const prevX = index > 0 ? getX(index - 1) : x;
                const leftX = index > 0 ? x - (x - prevX) / 2 : x - hoverWidth;
                const rightX = index < data.length - 1 ? x + hoverWidth : x + hoverWidth;

                return (
                  <g key={`hover-area-${index}`}>
                    <rect
                      x={leftX}
                      y={padding}
                      width={rightX - leftX}
                      height={innerHeight}
                      fill="transparent"
                      className="storybook-chart__hover-area"
                      onMouseEnter={(e) => handleMouseEnter(index, e)}
                      onMouseLeave={handleMouseLeave}
                    />
                    {hoveredIndex === index && (
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        className="storybook-chart__point storybook-chart__point--visible"
                        fill={color}
                        stroke="#ffffff"
                        strokeWidth="2"
                        onClick={() => onClick?.(point, index)}
                        style={{ cursor: onClick ? 'pointer' : 'default' }}
                      />
                    )}
                  </g>
                );
              })
            : null}
          {showLabels &&
            data.map((point, index) => {
              const x = getX(index);
              return (
                <text
                  key={`label-${index}`}
                  x={x}
                  y={padding + innerHeight + 20}
                  className="storybook-chart__label"
                  textAnchor="middle"
                >
                  {point.label}
                </text>
              );
            })}
        </svg>
        {hoveredIndex !== null && tooltipPosition && (
          <div
            className={[
              'storybook-chart__tooltip',
              tooltipPosition.alignRight ? 'storybook-chart__tooltip--left' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <div className="storybook-chart__tooltip-date">{getCurrentDate()}</div>
            <div className="storybook-chart__tooltip-items">
              {data.map((point, index) => (
                <div
                  key={`tooltip-${index}`}
                  className="storybook-chart__tooltip-item"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0.5,
                  }}
                >
                  <div
                    className="storybook-chart__tooltip-color"
                    style={{ backgroundColor: point.color || color }}
                  />
                  <span className="storybook-chart__tooltip-value">
                    {formatValue(point.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
