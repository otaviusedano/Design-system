import type { Meta, StoryObj } from '@storybook/react-vite';

import { QuotaCard } from './QuotaCard';

const HouseIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 5L5 15V35H15V25H25V35H35V15L20 5Z"
      stroke="#1a1a6b"
      strokeWidth="2"
      fill="none"
    />
    <rect x="17" y="20" width="6" height="8" stroke="#1a1a6b" strokeWidth="2" />
  </svg>
);

const meta = {
  title: 'Data Display/Quota Card',
  component: QuotaCard,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=472-8081&m=dev',
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
      variant: 'error',
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
    logo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <HouseIcon />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0f172a',
              fontFamily: 'serif',
            }}
          >
            stefanını
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 400,
              color: '#94a3b8',
              letterSpacing: '1px',
            }}
          >
            GROUP
          </span>
        </div>
      </div>
    ),
  },
};

export const WithSuccessStatus: Story = {
  args: {
    title: 'Crédito Imobiliário',
    status: {
      label: 'Aprovado',
      variant: 'success',
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

export const Clickable: Story = {
  args: {
    title: 'Crédito Imobiliário',
    status: {
      label: 'Em análise',
      variant: 'info',
    },
    values: [
      {
        label: 'Valor do crédito:',
        value: 'R$ 200.000,00',
      },
    ],
    onClick: () => {
      console.log('Card clicked');
    },
  },
};
