import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Titulo',
    tagLabel: 'Nome da tag',
    content: 'Insira o conteudo aqui',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=297-3941&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleActions: Story = {
  args: {
    variation: 'multiple-actions',
  },
};

export const SimpleAction: Story = {
  args: {
    variation: 'simple-action',
  },
};

