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
    placeholder: 'Select...',
    options: baseOptions,
    state: 'Default',
    showIcon: true,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=206-2689&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focus: Story = {
  args: {
    state: 'Focus',
  },
};

export const Filled: Story = {
  args: {
    state: 'Filled',
    value: '2',
  },
};

export const Disabled: Story = {
  args: {
    state: 'Disabled',
  },
};

export const Error: Story = {
  args: {
    state: 'Error',
    value: '2',
    errorText: 'Error message.',
  },
};

export const FigmaPreview: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 328px)',
        gap: 28,
        alignItems: 'start',
      }}
    >
      <Select state="Default" options={baseOptions} />
      <Select state="Focus" options={baseOptions} />
      <Select state="Filled" value="2" options={baseOptions} />
      <Select state="Disabled" options={baseOptions} />
      <Select state="Error" value="2" errorText="Error message." options={baseOptions} />
    </div>
  ),
};




