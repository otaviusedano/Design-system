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

const notFoundIcon = <i className="fa-solid fa-magnifying-glass" aria-hidden />;

export const Default: Story = {
  args: {
    title: 'Nenhum resultado encontrado',
    description: 'Não encontramos o que você procurou. Tente ajustar os filtros.',
    icon: notFoundIcon,
  },
};
