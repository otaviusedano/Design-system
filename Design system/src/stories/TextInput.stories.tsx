import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './TextInput';

const meta = {
  title: 'Form/Text Input',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=72-140&m=dev',
    },
    layout: 'padded',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDefault: Story = { args: { variation: 'Default', state: 'Default' } };
export const DefaultFocus: Story = { args: { variation: 'Default', state: 'Focus' } };
export const DefaultFilled: Story = { args: { variation: 'Default', state: 'Filled' } };
export const DefaultDisabled: Story = { args: { variation: 'Default', state: 'Disabled' } };
export const DefaultError: Story = { args: { variation: 'Default', state: 'Error' } };

export const PriceDefault: Story = { args: { variation: 'Price', state: 'Default' } };
export const PriceFocus: Story = { args: { variation: 'Price', state: 'Focus' } };
export const PriceFilled: Story = { args: { variation: 'Price', state: 'Filled' } };
export const PriceDisabled: Story = { args: { variation: 'Price', state: 'Disabled' } };
export const PriceError: Story = { args: { variation: 'Price', state: 'Error' } };

export const PercentDefault: Story = { args: { variation: 'Percent', state: 'Default' } };
export const PercentFocus: Story = { args: { variation: 'Percent', state: 'Focus' } };
export const PercentFilled: Story = { args: { variation: 'Percent', state: 'Filled' } };
export const PercentDisabled: Story = { args: { variation: 'Percent', state: 'Disabled' } };
export const PercentError: Story = { args: { variation: 'Percent', state: 'Error' } };

export const RangeDefault: Story = { args: { variation: 'Range', state: 'Default' } };
export const RangeFocus: Story = { args: { variation: 'Range', state: 'Focus' } };
export const RangeFilled: Story = { args: { variation: 'Range', state: 'Filled' } };
export const RangeDisabled: Story = { args: { variation: 'Range', state: 'Disabled' } };
export const RangeError: Story = { args: { variation: 'Range', state: 'Error' } };

export const TextAreaDefault: Story = { args: { variation: 'Text area', state: 'Default' } };
export const TextAreaFocus: Story = { args: { variation: 'Text area', state: 'Focus' } };
export const TextAreaFilled: Story = { args: { variation: 'Text area', state: 'Filled' } };
export const TextAreaDisabled: Story = { args: { variation: 'Text area', state: 'Disabled' } };
export const TextAreaError: Story = { args: { variation: 'Text area', state: 'Error' } };
