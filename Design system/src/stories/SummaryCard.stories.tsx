import type { Meta, StoryObj } from '@storybook/react-vite';

import { SummaryCard } from './SummaryCard';

const meta = {
  title: 'Data Display/Summary Card',
  component: SummaryCard,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=472-8081&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Titulo',
    items: [
      {
        label: 'Valor A:',
        value: 'R$ 500.000,00',
      },
      {
        label: 'Valor A:',
        value: 'R$ 500.000,00',
      },
      {
        label: 'Valor A:',
        value: 'R$ 500.000,00',
      },
      {
        label: 'Valor A:',
        value: '- R$ 500.000,00',
        isNegative: true,
      },
      {
        label: 'Valor A:',
        value: 'R$ 500.000,00',
      },
    ],
    totalValue: 'R$ 2.500.000,00',
  },
};

export const WithCustomTotalLabel: Story = {
  args: {
    title: 'Resumo Financeiro',
    items: [
      {
        label: 'Receitas:',
        value: 'R$ 1.000.000,00',
      },
      {
        label: 'Despesas:',
        value: '- R$ 500.000,00',
        isNegative: true,
      },
    ],
    totalLabel: 'Saldo:',
    totalValue: 'R$ 500.000,00',
  },
};

export const MultipleItems: Story = {
  args: {
    title: 'Detalhamento',
    items: [
      {
        label: 'Item 1:',
        value: 'R$ 100.000,00',
      },
      {
        label: 'Item 2:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Item 3:',
        value: 'R$ 300.000,00',
      },
      {
        label: 'Item 4:',
        value: '- R$ 50.000,00',
        isNegative: true,
      },
      {
        label: 'Item 5:',
        value: 'R$ 150.000,00',
      },
      {
        label: 'Item 6:',
        value: 'R$ 250.000,00',
      },
    ],
    totalValue: 'R$ 950.000,00',
  },
};
