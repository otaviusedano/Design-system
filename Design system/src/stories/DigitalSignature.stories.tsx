import type { Meta, StoryObj } from '@storybook/react-vite';

import { DigitalSignature } from './DigitalSignature';

const meta = {
  title: 'Components/DigitalSignature',
  component: DigitalSignature,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=796-732&m=dev',
    },
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof DigitalSignature>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Clique para assinar',
  },
};

export const Assinado: Story = {
  args: {
    placeholder: 'Clique para assinar',
    defaultSigned: true,
  },
};
