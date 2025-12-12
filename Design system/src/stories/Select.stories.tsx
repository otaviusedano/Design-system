import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from './Select';

const baseOptions = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
];

const meta = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Selecione a opção',
    options: baseOptions,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=72-139&t=cyoEHFuYif50QlIb-4',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focus: Story = {
  args: {
    autoFocus: true,
  },
};

export const Filled: Story = {
  args: {
    defaultValue: '2',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    errorText: 'Mensagem de erro',
  },
};

export const LayoutExamples: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 360 }}>
      <Select label="Horizontal" options={baseOptions} />
      <Select label="Altura" options={baseOptions} />
      <div style={{ display: 'flex', gap: 8 }}>
        <Select label="Margem" options={baseOptions} />
        <Select label="Preenchimento" options={baseOptions} />
      </div>
    </div>
  ),
};



