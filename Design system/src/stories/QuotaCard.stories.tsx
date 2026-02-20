import type { Meta, StoryObj } from '@storybook/react-vite';

import { QuotaCard } from './QuotaCard';

const meta = {
  title: 'Data Display/Quota Card',
  component: QuotaCard,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=494-1362&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof QuotaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Crédito Imobiliário',
    status: {
      label: 'Cancelada',
      variant: 'red',
    },
    values: [
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
    ],
  },
};

export const TagRoxa: Story = {
  args: {
    title: 'Crédito Imobiliário',
    status: {
      label: 'Em análise',
      variant: 'purple',
    },
    values: [
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
    ],
  },
};

export const SemTag: Story = {
  args: {
    title: 'Crédito Imobiliário',
    values: [
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
    ],
  },
};
