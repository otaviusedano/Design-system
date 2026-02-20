import type { Meta, StoryObj } from '@storybook/react-vite';

import { QRCode } from './QRCode';

const meta = {
  title: 'Components/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=786-1924&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'QR Code Topaz',
  },
};
