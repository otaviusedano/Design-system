import './chart.css';

type ChartVariation = 'simple' | 'multi' | 'type' | 'multi-type';
type ChartType = 'bar' | 'line' | 'circle';
type ChartSize = 'default' | 'sm' | 'md';

type LegendItem = {
  label: string;
  color: string;
};

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const AXIS_STEPS = ['30%', '25%', '20%', '15%', '10%', '5%', '0'];
const CHART_COLORS = {
  green: '#56f56c',
  red: '#f34040',
  blue: '#626295',
  skyBlue: '#4dd9ff',
  purple: '#9864e2',
};

const SIMPLE_BARS = [22, 16, 12, 18, 21, 14, 9, 11, 5, 13, 16, 22];
const SIMPLE_LINE = [13, 21, 24, 18, 12, 10, 9, 11, 14, 15, 15, 16];

const TYPE_BAR_MAIN = [13, 9, 7, 11, 13, 8, 5, 7, 2, 8, 10, 14];
const TYPE_BAR_SECONDARY = [4, 4, 3, 4, 4, 3, 2, 2, 1, 3, 4, 4];
const TYPE_BAR_TERTIARY = [5, 4, 4, 6, 6, 4, 3, 3, 2, 4, 4, 6];

const MULTI_BAR_GREEN = [24, 26, 28, 25, 29, 26, 28, 25, 29, 26, 28, 25];
const MULTI_BAR_RED = [4, 4, 5, 3, 4, 4, 3, 3, 4, 3, 4, 3];

const MULTI_TYPE_SERIES = [
  [10, 16, 21, 16, 12, 8, 7, 8, 9, 10, 11, 12],
  [8, 8, 7, 7, 6, 6, 5, 5, 5, 6, 7, 8],
  [3, 4, 6, 4, 3, 2, 2, 2, 3, 4, 5, 4],
  [2, 2, 3, 2, 1, 1, 1, 1, 1, 2, 2, 2],
];

export interface ChartProps {
  className?: string;
  variation?: ChartVariation;
  type?: ChartType;
  size?: ChartSize;
  showLegend?: boolean;
  withInfoRight?: boolean;
  showPart1?: boolean;
  showPart2?: boolean;
  showPart3?: boolean;
  showPart4?: boolean;
  showPart6?: boolean;
}

const createSmoothPath = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 2) return '';
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const controlX1 = current.x + (next.x - current.x) / 3;
    const controlX2 = current.x + ((next.x - current.x) * 2) / 3;
    path += ` C ${controlX1} ${current.y}, ${controlX2} ${next.y}, ${next.x} ${next.y}`;
  }

  return path;
};

const buildLegend = (
  items: LegendItem[],
  toggles: Pick<ChartProps, 'showPart1' | 'showPart2' | 'showPart3' | 'showPart4' | 'showPart6'>,
) => {
  const { showPart1 = true, showPart2 = true, showPart3 = true, showPart4 = true, showPart6 = true } = toggles;
  const visibility = [true, showPart1, showPart2, showPart6, showPart4, showPart3];
  return items.filter((_, index) => visibility[index] ?? true);
};

const Legend = ({ items, center = false }: { items: LegendItem[]; center?: boolean }) => (
  <div className={['chart-legend', center ? 'chart-legend-center' : ''].filter(Boolean).join(' ')}>
    {items.map((item) => (
      <div key={item.label} className="chart-legend-item">
        <span className="chart-legend-swatch" style={{ backgroundColor: item.color }} />
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

const PieChart = ({ size = 'md' }: { size: ChartSize }) => {
  const pieSize = size === 'sm' ? 180 : 240;
  const center = pieSize / 2;
  const radius = pieSize / 2 - 8;
  const values = [29, 22, 19, 8, 6];
  const colors = [CHART_COLORS.green, CHART_COLORS.blue, CHART_COLORS.skyBlue, CHART_COLORS.red, CHART_COLORS.purple];
  const total = values.reduce((sum, value) => sum + value, 0);
  let startAngle = -90;

  return (
    <svg className="chart-svg" width={pieSize} height={pieSize} viewBox={`0 0 ${pieSize} ${pieSize}`}>
      {values.map((value, index) => {
        const arc = (value / total) * 360;
        const endAngle = startAngle + arc;
        const startRad = (Math.PI * startAngle) / 180;
        const endRad = (Math.PI * endAngle) / 180;
        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);
        const largeArc = arc > 180 ? 1 : 0;
        const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        startAngle = endAngle;

        return <path key={`slice-${index}`} d={path} fill={colors[index]} />;
      })}
    </svg>
  );
};

const CartesianChart = ({
  variation,
  type,
}: {
  variation: ChartVariation;
  type: Exclude<ChartType, 'circle'>;
}) => {
  const width = 500;
  const height = 172;
  const paddingTop = 4;
  const paddingBottom = 6;
  const maxValue = 30;
  const baseline = height - paddingBottom;
  const plotHeight = height - paddingTop - paddingBottom;
  const getX = (index: number) => (index * width) / (MONTHS.length - 1);
  const getY = (value: number) => baseline - (value / maxValue) * plotHeight;

  const gridLines = AXIS_STEPS.map((step, index) => {
    const value = (AXIS_STEPS.length - 1 - index) * 5;
    return (
      <line
        key={`grid-${step}`}
        className="chart-grid"
        x1={0}
        y1={getY(value)}
        x2={width}
        y2={getY(value)}
      />
    );
  });

  if (type === 'bar' && variation === 'simple') {
    const barWidth = 22;
    return (
      <svg className="chart-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {gridLines}
        {SIMPLE_BARS.map((value, index) => (
          <rect
            key={`bar-simple-${index}`}
            x={getX(index) - barWidth / 2}
            y={getY(value)}
            width={barWidth}
            height={baseline - getY(value)}
            rx={4}
            fill={CHART_COLORS.green}
          />
        ))}
      </svg>
    );
  }

  if (type === 'bar' && variation === 'multi') {
    const columnWidth = 26;
    const barWidth = 10;
    return (
      <svg className="chart-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {gridLines}
        {MONTHS.map((month, index) => {
          const x = getX(index) - columnWidth / 2;
          return (
            <g key={`bar-multi-${month}`}>
              <rect
                x={x}
                y={getY(MULTI_BAR_GREEN[index])}
                width={barWidth}
                height={baseline - getY(MULTI_BAR_GREEN[index])}
                rx={3}
                fill={CHART_COLORS.green}
              />
              <rect
                x={x + barWidth + 6}
                y={getY(MULTI_BAR_RED[index])}
                width={barWidth}
                height={baseline - getY(MULTI_BAR_RED[index])}
                rx={3}
                fill={CHART_COLORS.red}
              />
            </g>
          );
        })}
      </svg>
    );
  }

  if (type === 'bar') {
    const barWidth = 24;
    return (
      <svg className="chart-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {gridLines}
        {MONTHS.map((month, index) => {
          const x = getX(index) - barWidth / 2;
          const red = TYPE_BAR_SECONDARY[index];
          const blue = TYPE_BAR_TERTIARY[index];
          const green = TYPE_BAR_MAIN[index];
          const redY = getY(red);
          const blueY = getY(red + blue);
          const greenY = getY(red + blue + green);
          return (
            <g key={`bar-type-${month}`}>
              <rect x={x} y={redY} width={barWidth} height={baseline - redY} fill={CHART_COLORS.red} rx={3} />
              <rect x={x} y={blueY} width={barWidth} height={redY - blueY} fill={CHART_COLORS.blue} rx={3} />
              <rect x={x} y={greenY} width={barWidth} height={blueY - greenY} fill={CHART_COLORS.green} rx={3} />
            </g>
          );
        })}
      </svg>
    );
  }

  if (type === 'line' && variation === 'multi-type') {
    const colors = [CHART_COLORS.green, CHART_COLORS.blue, CHART_COLORS.skyBlue, CHART_COLORS.red];
    const stacked = MONTHS.map((_, index) =>
      MULTI_TYPE_SERIES.reduce<number[]>((acc, series, seriesIndex) => {
        const prev = acc[seriesIndex - 1] ?? 0;
        acc.push(prev + series[index]);
        return acc;
      }, []),
    );

    return (
      <svg className="chart-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {gridLines}
        {colors.map((color, seriesIndex) => {
          const topPoints = stacked.map((values, index) => ({ x: getX(index), y: getY(values[seriesIndex]) }));
          const bottomPoints =
            seriesIndex === 0
              ? stacked.map((_, index) => ({ x: getX(index), y: baseline }))
              : stacked.map((values, index) => ({ x: getX(index), y: getY(values[seriesIndex - 1]) }));
          const topPath = createSmoothPath(topPoints);
          const bottomPath = createSmoothPath([...bottomPoints].reverse());
          return <path key={`area-${color}`} d={`${topPath} L ${bottomPath.slice(2)} Z`} fill={color} opacity={0.95} />;
        })}
      </svg>
    );
  }

  const lineValues = type === 'line' && variation === 'type' ? TYPE_BAR_MAIN.map((value, index) => value + TYPE_BAR_SECONDARY[index]) : SIMPLE_LINE;
  const points = lineValues.map((value, index) => ({ x: getX(index), y: getY(value) }));
  const linePath = createSmoothPath(points);
  const areaPath = `${linePath} L ${getX(MONTHS.length - 1)} ${baseline} L 0 ${baseline} Z`;

  return (
    <svg className="chart-svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {gridLines}
      <path d={areaPath} fill={CHART_COLORS.green} opacity={0.22} />
      <path d={linePath} fill="none" stroke={CHART_COLORS.green} strokeWidth={3} />
    </svg>
  );
};

export const Chart = ({
  className,
  variation = 'simple',
  type = 'bar',
  size = 'default',
  showLegend = true,
  withInfoRight = true,
  showPart1 = true,
  showPart2 = true,
  showPart3 = true,
  showPart4 = true,
  showPart6 = true,
}: ChartProps) => {
  const legendItems = buildLegend(
    [
      { label: 'Item 1', color: CHART_COLORS.green },
      { label: 'Item 2', color: CHART_COLORS.red },
      { label: 'Item 3', color: CHART_COLORS.blue },
      { label: 'Item 4', color: CHART_COLORS.skyBlue },
      { label: 'Item 5', color: CHART_COLORS.purple },
    ],
    { showPart1, showPart2, showPart3, showPart4, showPart6 },
  );

  if (type === 'circle') {
    return (
      <div className={['chart-root', 'chart-circle-layout', className].filter(Boolean).join(' ')}>
        <div className={['chart-circle-content', withInfoRight ? 'chart-circle-content-row' : ''].join(' ')}>
          <PieChart size={size} />
          {showLegend ? <Legend items={legendItems} center={!withInfoRight} /> : null}
        </div>
      </div>
    );
  }

  const wide = variation === 'multi';
  const plotLegend =
    variation === 'simple'
      ? legendItems.slice(0, 1)
      : variation === 'multi'
      ? legendItems.slice(0, 2)
      : variation === 'multi-type'
      ? legendItems.slice(0, 4)
      : withInfoRight
      ? legendItems.slice(0, 4)
      : legendItems.slice(0, 2);

  return (
    <div className={['chart-root', wide ? 'chart-root-wide' : '', className].filter(Boolean).join(' ')}>
      <div className="chart-plot-wrap">
        <div className="chart-y-axis">
          {AXIS_STEPS.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
        <CartesianChart variation={variation} type={type === 'circle' ? 'bar' : type} />
      </div>
      <div className="chart-months">
        {MONTHS.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
      {showLegend ? <Legend items={plotLegend} /> : null}
    </div>
  );
};
