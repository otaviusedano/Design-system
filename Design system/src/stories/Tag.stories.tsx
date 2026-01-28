import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tag } from './Tag';

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: {
    label: 'Tag label',
    variant: 'purple',
    size: 'md',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=72-139&t=cyoEHFuYif50QlIb-4',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Purple: Story = {};

export const SkyBlue: Story = {
  args: {
    variant: 'sky',
  },
};

export const WaterGreen: Story = {
  args: {
    variant: 'water',
  },
};

export const Gray: Story = {
  args: {
    variant: 'gray',
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    variant: 'sky',
    label: 'Read-only',
  },
};

export const Deletable: Story = {
  args: {
    deletable: true,
    label: 'Deletable',
    variant: 'purple',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Tag label="Medium (md)" size="md" variant="purple" />
      <Tag label="Large (lg)" size="lg" variant="sky" />
    </div>
  ),
};

export const LayoutSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag label="Tag" variant="purple" />
      <Tag label="Tag" variant="sky" />
      <Tag label="Tag" variant="water" />
      <Tag label="Tag" variant="gray" />
      <Tag label="Tag" variant="red" />
      <Tag label="Deletable" variant="purple" deletable />
    </div>
  ),
};




