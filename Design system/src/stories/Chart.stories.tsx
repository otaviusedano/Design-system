import type { Meta, StoryObj } from "@storybook/react-vite";

import { Chart } from "./Chart";

const meta = {
  title: "Components/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=761-2271&m=dev",
    },
    layout: "padded",
  },
  args: {
    variation: "simple",
    type: "bar",
    size: "default",
    showLegend: true,
    withInfoRight: true,
  },
  argTypes: {
    variation: {
      control: { type: "select" },
      options: ["simple", "type", "multi", "multi-type"],
    },
    type: {
      control: { type: "select" },
      options: ["bar", "line", "circle"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "md"],
    },
    showLegend: { control: "boolean" },
    withInfoRight: { control: "boolean" },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SimpleBarWithInfoRight: Story = {
  args: {
    variation: "simple",
    type: "bar",
    withInfoRight: true,
  },
};

export const TypeBarWithInfoRight: Story = {
  args: {
    variation: "type",
    type: "bar",
    withInfoRight: true,
  },
};

export const TypeBarWithoutInfoRight: Story = {
  args: {
    variation: "type",
    type: "bar",
    withInfoRight: false,
  },
};

export const TypeLineWithInfoRight: Story = {
  args: {
    variation: "type",
    type: "line",
    withInfoRight: true,
  },
};

export const TypeLineWithoutInfoRight: Story = {
  args: {
    variation: "type",
    type: "line",
    withInfoRight: false,
  },
};

export const MultiBar: Story = {
  args: {
    variation: "multi",
    type: "bar",
    withInfoRight: true,
  },
};

export const MultiTypeArea: Story = {
  args: {
    variation: "multi-type",
    type: "line",
    withInfoRight: true,
  },
};

export const CircleSmWithoutInfoRight: Story = {
  args: {
    variation: "type",
    type: "circle",
    size: "sm",
    withInfoRight: false,
  },
};

export const CircleMdWithoutInfoRight: Story = {
  args: {
    variation: "type",
    type: "circle",
    size: "md",
    withInfoRight: false,
  },
};

export const CircleMdWithInfoRight: Story = {
  args: {
    variation: "type",
    type: "circle",
    size: "md",
    withInfoRight: true,
  },
};
