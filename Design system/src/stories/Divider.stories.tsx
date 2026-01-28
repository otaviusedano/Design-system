import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Divider do sistema Codex Topaz, com variacoes de tamanho, tom e estilo.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["solid", "dashed"],
    },
    tone: {
      control: "select",
      options: ["default", "muted", "strong"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
  args: {
    label: "Ou",
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    label: undefined,
  },
};

export const WithLabel: Story = {};

export const Dashed: Story = {
  args: {
    variant: "dashed",
    label: "Separador",
  },
};

export const Strong: Story = {
  args: {
    tone: "strong",
    label: "Atencao",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    label: undefined,
  },
  render: (args) => (
    <div style={{ height: 140 }}>
      <Divider {...args} />
    </div>
  ),
};
