import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table, type TableColumn, type TableRow } from './Table';

type TableDataRow = {
  status: {
    checked: boolean;
    tag: {
      label: string;
      variant: 'success' | 'info' | 'warning' | 'error';
    };
  };
  client: {
    icon: React.ReactNode;
    name: string;
    subtitle: string;
  };
  number: string;
  product: {
    icon: React.ReactNode;
    name: string;
    subtitle: string;
  };
  header1: string;
  header2: string;
  header3: string;
};

const columns: TableColumn<TableDataRow>[] = [
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={row.status.checked}
          readOnly
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor:
              row.status.tag.variant === 'success'
                ? '#10b981'
                : row.status.tag.variant === 'info'
                  ? '#3b82f6'
                  : row.status.tag.variant === 'warning'
                    ? '#f59e0b'
                    : '#ef4444',
            color: '#ffffff',
          }}
        >
          {row.status.tag.label}
        </span>
      </div>
    ),
  },
  {
    key: 'client',
    header: 'Client',
    accessor: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {row.client.icon}
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
            {row.client.name}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
            {row.client.subtitle}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'number',
    header: 'Number',
  },
  {
    key: 'product',
    header: 'Product',
    accessor: (row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {row.product.icon}
        <div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
            {row.product.name}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
            {row.product.subtitle}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: 'header1',
    header: 'Header',
  },
  {
    key: 'header2',
    header: 'Header',
  },
  {
    key: 'header3',
    header: 'Header',
  },
];

const PersonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
      fill="#64748b"
    />
    <path
      d="M10 12C5.58172 12 2 14.2386 2 17V20H18V17C18 14.2386 14.4183 12 10 12Z"
      fill="#64748b"
    />
  </svg>
);

const CarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 10L4 6H8L10 4H12L14 6H18L20 10V16H18V18H16V16H4V18H2V16H0V10H2ZM2 8V10H18V8H16L14 6H6L4 8H2ZM4 14H16V12H4V14Z"
      fill="#64748b"
    />
  </svg>
);

const sampleRows: TableRow<TableDataRow>[] = [
  {
    id: 'row-1',
    data: {
      status: {
        checked: false,
        tag: { label: 'Quitado', variant: 'success' },
      },
      client: {
        icon: <PersonIcon />,
        name: 'Nome do cliente',
        subtitle: 'CPF ou CNPJ',
      },
      number: '10984',
      product: {
        icon: <CarIcon />,
        name: 'Nome do produto',
        subtitle: 'Nome do plano',
      },
      header1: 'Text cell',
      header2: 'Text cell',
      header3: 'Text cell',
    },
  },
  {
    id: 'row-2',
    data: {
      status: {
        checked: true,
        tag: { label: 'Em andamento', variant: 'info' },
      },
      client: {
        icon: <PersonIcon />,
        name: 'Nome do cliente',
        subtitle: 'CPF ou CNPJ',
      },
      number: '103939041',
      product: {
        icon: <CarIcon />,
        name: 'Nome do produto',
        subtitle: 'Nome do plano',
      },
      header1: 'Text cell',
      header2: 'Text cell',
      header3: 'Text cell',
    },
    highlighted: true,
  },
];

const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=456-33065&m=dev',
    },
    layout: 'padded',
  },
  argTypes: {
    showCheckbox: {
      control: 'boolean',
    },
    showActions: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    rows: sampleRows,
    showCheckbox: true,
    showActions: true,
    footer: (
      <div>
        Total: <strong>50</strong>
      </div>
    ),
  },
};

export const WithoutCheckbox: Story = {
  args: {
    columns,
    rows: sampleRows,
    showCheckbox: false,
    showActions: true,
    footer: (
      <div>
        Total: <strong>50</strong>
      </div>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    columns,
    rows: sampleRows,
    showCheckbox: true,
    showActions: false,
    footer: (
      <div>
        Total: <strong>50</strong>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    columns,
    rows: [],
    showCheckbox: true,
    showActions: true,
    emptyMessage: 'Não há dados para exibir nesta tabela',
  },
};

export const Clickable: Story = {
  args: {
    columns,
    rows: sampleRows,
    showCheckbox: true,
    showActions: true,
    onRowClick: (row, index) => {
      console.log('Row clicked:', row, index);
    },
    footer: (
      <div>
        Total: <strong>50</strong>
      </div>
    ),
  },
};
