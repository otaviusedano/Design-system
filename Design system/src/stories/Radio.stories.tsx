import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio } from './Radio';

const meta = {
  title: 'Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    name: 'radio-example',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=335-483&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Focus: Story = {
  args: {
    autoFocus: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    defaultChecked: true,
    errorText: 'Mensagem de erro.',
  },
};

export const GroupLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio label="Opção 1" name="radio-group" />
      <Radio label="Opção 2" name="radio-group" defaultChecked />
      <Radio label="Opção 3" name="radio-group" disabled />
      <Radio label="Opção 4" name="radio-group-error" defaultChecked errorText="Mensagem de erro." />
    </div>
  ),
};

