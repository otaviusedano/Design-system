import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chart } from './Chart';

const meta = {
  title: 'Components/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=761-2271&m=dev',
    },
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'area', 'pie'],
    },
    height: {
      control: { type: 'number', min: 100, max: 500 },
    },
    color: {
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { label: 'Jan', value: 45 },
  { label: 'Fev', value: 52 },
  { label: 'Mar', value: 48 },
  { label: 'Abr', value: 61 },
  { label: 'Mai', value: 55 },
  { label: 'Jun', value: 67 },
  { label: 'Jul', value: 72 },
  { label: 'Ago', value: 68 },
  { label: 'Set', value: 75 },
  { label: 'Out', value: 80 },
  { label: 'Nov', value: 78 },
  { label: 'Dez', value: 85 },
];

export const Default: Story = {
  args: {
    title: 'Vendas mensais',
    data: sampleData,
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const LineChart: Story = {
  args: {
    title: 'Vendas mensais',
    data: sampleData,
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
    onClick: (point, index) => console.log('Clicked:', point, index),
  },
};

export const AreaChart: Story = {
  args: {
    title: 'Vendas mensais',
    data: sampleData,
    type: 'area',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const BarChart: Story = {
  args: {
    title: 'Vendas mensais',
    data: sampleData,
    type: 'bar',
    height: 200,
    showGrid: true,
    showLabels: true,
    onClick: (point, index) => console.log('Clicked:', point, index),
  },
};

export const WithYAxis: Story = {
  args: {
    title: 'Vendas mensais',
    data: sampleData.map((d) => ({ ...d, value: d.value * 1000 })),
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
    showYAxis: true,
  },
};

export const PieChart2Items: Story = {
  args: {
    title: 'Distribuição de vendas',
    data: [
      { label: 'Online', value: 60, color: '#1a1a6b' },
      { label: 'Presencial', value: 40, color: '#3b82f6' },
    ],
    type: 'pie',
    height: 300,
    onClick: (point, index) => console.log('Clicked:', point, index),
  },
};

export const PieChart3Items: Story = {
  args: {
    title: 'Distribuição de vendas',
    data: [
      { label: 'Q1', value: 30, color: '#1a1a6b' },
      { label: 'Q2', value: 25, color: '#3b82f6' },
      { label: 'Q3', value: 45, color: '#10b981' },
    ],
    type: 'pie',
    height: 300,
    onClick: (point, index) => console.log('Clicked:', point, index),
  },
};

export const PieChart4Items: Story = {
  args: {
    title: 'Distribuição de vendas',
    data: [
      { label: 'Q1', value: 30, color: '#1a1a6b' },
      { label: 'Q2', value: 25, color: '#3b82f6' },
      { label: 'Q3', value: 20, color: '#10b981' },
      { label: 'Q4', value: 25, color: '#f59e0b' },
    ],
    type: 'pie',
    height: 300,
    onClick: (point, index) => console.log('Clicked:', point, index),
  },
};

export const CustomColor: Story = {
  args: {
    title: 'Vendas mensais',
    data: sampleData,
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
    color: '#10b981',
  },
};

export const SmallDataset: Story = {
  args: {
    title: 'Vendas semanais',
    data: [
      { label: 'Seg', value: 20 },
      { label: 'Ter', value: 35 },
      { label: 'Qua', value: 28 },
      { label: 'Qui', value: 42 },
      { label: 'Sex', value: 50 },
    ],
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    data: sampleData,
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const LineChart2Items: Story = {
  args: {
    title: 'Vendas por trimestre',
    data: [
      { label: 'Q1', value: 12000, color: '#1a1a6b' },
      { label: 'Q2', value: 15000, color: '#3b82f6' },
    ],
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const LineChart3Items: Story = {
  args: {
    title: 'Vendas por trimestre',
    data: [
      { label: 'Q1', value: 12000, color: '#1a1a6b' },
      { label: 'Q2', value: 15000, color: '#3b82f6' },
      { label: 'Q3', value: 18000, color: '#10b981' },
    ],
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const LineChart4Items: Story = {
  args: {
    title: 'Vendas por trimestre',
    data: [
      { label: 'Q1', value: 12000, color: '#1a1a6b' },
      { label: 'Q2', value: 15000, color: '#3b82f6' },
      { label: 'Q3', value: 18000, color: '#10b981' },
      { label: 'Q4', value: 20000, color: '#f59e0b' },
    ],
    type: 'line',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const BarChart2Items: Story = {
  args: {
    title: 'Vendas por trimestre',
    data: [
      { label: 'Q1', value: 12000, color: '#1a1a6b' },
      { label: 'Q2', value: 15000, color: '#3b82f6' },
    ],
    type: 'bar',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const BarChart3Items: Story = {
  args: {
    title: 'Vendas por trimestre',
    data: [
      { label: 'Q1', value: 12000, color: '#1a1a6b' },
      { label: 'Q2', value: 15000, color: '#3b82f6' },
      { label: 'Q3', value: 18000, color: '#10b981' },
    ],
    type: 'bar',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};

export const BarChart4Items: Story = {
  args: {
    title: 'Vendas por trimestre',
    data: [
      { label: 'Q1', value: 12000, color: '#1a1a6b' },
      { label: 'Q2', value: 15000, color: '#3b82f6' },
      { label: 'Q3', value: 18000, color: '#10b981' },
      { label: 'Q4', value: 20000, color: '#f59e0b' },
    ],
    type: 'bar',
    height: 200,
    showGrid: true,
    showLabels: true,
  },
};
