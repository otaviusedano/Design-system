import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Skeleton do sistema Codex Topaz com variacoes de formato, tamanho e animacao.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "rect"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    animation: {
      control: "select",
      options: ["pulse", "shimmer", "none"],
    },
  },
  args: {
    variant: "text",
    size: "md",
    animation: "pulse",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const Lines: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Skeleton {...args} count={3} gap={12} />
    </div>
  ),
};

export const Rectangle: Story = {
  args: {
    variant: "rect",
    size: "md",
    height: 120,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const Shimmer: Story = {
  args: {
    animation: "shimmer",
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Skeleton {...args} count={2} gap={10} />
    </div>
  ),
};
