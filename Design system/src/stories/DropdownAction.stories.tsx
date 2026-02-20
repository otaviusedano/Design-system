import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownAction } from './DropdownAction';

const meta = {
  title: 'Components/Dropdown Action',
  component: DropdownAction,
  tags: ['autodocs'],
  args: {
    variation: 'closed',
    state: 'default',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=300-6775&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClosedDefault: Story = {};

export const ClosedFocus: Story = {
  args: {
    state: 'focus',
  },
};

export const OpenedDefault: Story = {
  args: {
    variation: 'opened',
    state: 'default',
  },
};

export const OpenedHover: Story = {
  args: {
    variation: 'opened',
    state: 'hover',
  },
};

export const OpenedFocus: Story = {
  args: {
    variation: 'opened',
    state: 'focus',
  },
};

export const OpenedPressed: Story = {
  args: {
    variation: 'opened',
    state: 'pressed',
  },
};

