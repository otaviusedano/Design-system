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
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Texto do tooltip',
    placement: 'top',
    children: (
      <button type="button">
        Passe o mouse
      </button>
    ),
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip abaixo do elemento',
    placement: 'bottom',
    children: (
      <span style={{ textDecoration: 'underline', cursor: 'default' }}>
        Trigger
      </span>
    ),
  },
};

export const Left: Story = {
  args: {
    content: 'À esquerda',
    placement: 'left',
    children: (
      <button type="button">Trigger</button>
    ),
  },
};

export const Right: Story = {
  args: {
    content: 'À direita',
    placement: 'right',
    children: (
      <button type="button">Trigger</button>
    ),
  },
};

export const LongContent: Story = {
  args: {
    content: 'Este é um tooltip com conteúdo mais longo para demonstrar quebra de linha quando o texto excede a largura máxima.',
    placement: 'top',
    children: (
      <button type="button">Hover para ver</button>
    ),
  },
};
