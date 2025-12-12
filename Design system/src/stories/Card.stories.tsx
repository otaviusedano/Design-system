import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

const baseProps = {
  title: 'Titulo do card aqui',
  subtitle: 'Subtitulo',
  description: 'Insira sua descrição aqui',
};

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  args: baseProps,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=72-139&t=cyoEHFuYif50QlIb-4',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleAction: Story = {
  args: {
    actions: [
      {
        label: 'Ver mais',
        variant: 'primary',
      },
    ],
  },
};

export const MultipleActions: Story = {
  args: {
    actions: [
      { label: 'Ver mais', variant: 'primary' },
      { label: 'Abrir', variant: 'secondary' },
    ],
  },
};

export const WithIcon: Story = {
  args: {
    actions: [
      { label: 'Ver mais', variant: 'primary' },
      { label: 'Abrir', variant: 'secondary' },
    ],
    icon: (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          background: 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 100%)',
        }}
      />
    ),
  },
};

