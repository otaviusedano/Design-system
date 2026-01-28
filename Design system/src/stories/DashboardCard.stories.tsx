import type { Meta, StoryObj } from '@storybook/react-vite';

import { DashboardCard } from './DashboardCard';

const meta = {
  title: 'Components/DashboardCard',
  component: DashboardCard,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=751-15211&m=dev',
    },
    layout: 'centered',
  },
  argTypes: {
    onClick: {
      action: 'card clicked',
    },
  },
} satisfies Meta<typeof DashboardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Total de vendas',
    value: 'R$ 125.430,00',
    icon: defaultIcon,
  },
};

export const WithTrend: Story = {
  args: {
    title: 'Total de vendas',
    value: 'R$ 125.430,00',
    icon: defaultIcon,
    trend: {
      value: '+12.5%',
      variant: 'purple',
    },
  },
};

export const WithDifferentVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
      }}
    >
      <DashboardCard
        title="Total de vendas"
        value="R$ 125.430,00"
        icon={defaultIcon}
        trend={{ value: '+12.5%', variant: 'purple' }}
      />
      <DashboardCard
        title="Novos clientes"
        value="1.234"
        icon={defaultIcon}
        trend={{ value: '+8.2%', variant: 'sky' }}
      />
      <DashboardCard
        title="Taxa de conversão"
        value="3.2%"
        icon={defaultIcon}
        trend={{ value: '-2.1%', variant: 'red' }}
      />
      <DashboardCard
        title="Pedidos pendentes"
        value="45"
        icon={defaultIcon}
        trend={{ value: '0%', variant: 'gray' }}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Total de vendas',
    value: 'R$ 125.430,00',
    icon: defaultIcon,
    trend: {
      value: '+12.5%',
      variant: 'purple',
    },
    onClick: () => console.log('Card clicked'),
  },
};

