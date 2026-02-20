import type { Meta, StoryObj } from '@storybook/react-vite';

import { Loading } from './Loading';

const meta = {
  title: 'Feedback/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=516-972&m=dev',
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
