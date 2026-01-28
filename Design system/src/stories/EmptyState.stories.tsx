import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=784-2899&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ícone "não encontrado": lupa com barra diagonal indicando busca sem resultados */
const notFoundIcon = (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle
      cx="34"
      cy="34"
      r="18"
      stroke="#94a3b8"
      strokeWidth="2"
    />
    <path
      d="M48 48l16 16"
      stroke="#94a3b8"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 54L54 20"
      stroke="#cbd5e1"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Default: Story = {
  args: {
    title: 'Nenhum item encontrado',
    description: 'Não há itens para exibir no momento.',
    icon: notFoundIcon,
  },
};
