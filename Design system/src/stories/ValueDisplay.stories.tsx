import type { Meta, StoryObj } from '@storybook/react-vite';

import { ValueDisplay } from './ValueDisplay';

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="3" fill="currentColor" />
    <path
      d="M10 3C5.58172 3 2 6.58172 2 11C2 15.4183 5.58172 19 10 19C14.4183 19 18 15.4183 18 11C18 6.58172 14.4183 3 10 3ZM10 17C6.68629 17 4 14.3137 4 11C4 7.68629 6.68629 5 10 5C13.3137 5 16 7.68629 16 11C16 14.3137 13.3137 17 10 17Z"
      fill="currentColor"
    />
  </svg>
);

const meta = {
  title: 'Data Display/Value Display',
  component: ValueDisplay,
  tags: ['autodocs'],
  args: {
    label: 'Valor do crédito:',
    value: 'R$ 200.000,00',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=472-8081&m=dev',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof ValueDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    layout: 'inline',
    icon: <EyeIcon />,
  },
};

export const Stacked: Story = {
  args: {
    layout: 'stacked',
  },
};

export const WithIcon: Story = {
  args: {
    layout: 'inline',
    icon: <EyeIcon />,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    icon: <EyeIcon />,
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    icon: <EyeIcon />,
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ValueDisplay
        label="Valor do crédito:"
        value="R$ 200.000,00"
        icon={<EyeIcon />}
        layout="inline"
      />
      <ValueDisplay
        label="Valor do crédito:"
        value="R$ 200.000,00"
        layout="stacked"
      />
      <ValueDisplay
        label="Valor do crédito:"
        value="R$ 200.000,00"
        icon={<EyeIcon />}
        layout="inline"
      />
    </div>
  ),
};
