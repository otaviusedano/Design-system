import type { Meta, StoryObj } from '@storybook/react-vite';

import { DatePicker } from './DatePicker';

const meta = {
  title: 'Form/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=203-6682&m=dev',
    },
    layout: 'padded',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDefault: Story = { args: { variation: 'Default', state: 'Default' } };
export const DefaultFocus: Story = { args: { variation: 'Default', state: 'Focus' } };
export const DefaultFilled: Story = { args: { variation: 'Default', state: 'Filled' } };
export const DefaultDisabled: Story = { args: { variation: 'Default', state: 'Disabled' } };
export const DefaultError: Story = { args: { variation: 'Default', state: 'Error' } };

export const RangeDefault: Story = { args: { variation: 'Range', state: 'Default' } };
export const RangeFocus: Story = { args: { variation: 'Range', state: 'Focus' } };
export const RangeFilled: Story = { args: { variation: 'Range', state: 'Filled' } };
export const RangeDisabled: Story = { args: { variation: 'Range', state: 'Disabled' } };
export const RangeError: Story = { args: { variation: 'Range', state: 'Error' } };
