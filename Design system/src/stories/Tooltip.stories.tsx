import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=803-7789&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Mensagem do tooltip.',
  },
};

export const TextoLongo: Story = {
  args: {
    message: 'Este tooltip segue o padrão visual do design system e suporta quebra de linha em mensagens maiores.',
  },
};
