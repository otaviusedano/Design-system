import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table, type TableProps, type TableRow } from './Table';

const sampleRows: TableRow[] = [
  {
    id: 'row-1',
    selected: false,
    status: { label: 'Quitado', tone: 'success' },
    client: { name: 'Nome do cliente', document: 'CPF ou CNPJ' },
    number: '10984',
    product: { name: 'Nome do produto', subtitle: 'Nome do plano' },
    header1: 'Text cell',
    header2: 'Text cell',
    header3: 'Text cell',
  },
  {
    id: 'row-2',
    selected: true,
    status: { label: 'Em andamento', tone: 'info' },
    client: { name: 'Nome do cliente', document: 'CPF ou CNPJ' },
    number: '103939041',
    product: { name: 'Nome do produto', subtitle: 'Nome do plano' },
    header1: 'Text cell',
    header2: 'Text cell',
    header3: 'Text cell',
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
    total: { control: 'number' },
    showColumn1: { control: 'boolean' },
    showColumn2: { control: 'boolean' },
    showColumn3: { control: 'boolean' },
    showColumn4: { control: 'boolean' },
    showColumn5: { control: 'boolean' },
    showColumn6: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: TableProps = {
  rows: sampleRows,
  total: 50,
  showColumn1: true,
  showColumn2: true,
  showColumn3: true,
  showColumn4: true,
  showColumn5: true,
  showColumn6: true,
};

export const Default: Story = {
  args: defaultArgs,
};

export const Compact: Story = {
  args: {
    ...defaultArgs,
    showColumn3: false,
    showColumn4: false,
    showColumn5: false,
  },
};
