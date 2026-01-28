import type { Meta, StoryObj } from '@storybook/react-vite';

import { FullScreenLoader } from './FullScreenLoader';

const meta = {
  title: 'Feedback/Full Screen Loader',
  component: FullScreenLoader,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=472-8081&m=dev',
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FullScreenLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'large',
  },
};
