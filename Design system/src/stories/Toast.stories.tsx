import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toast } from "./Toast";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=367-904&m=dev",
    },
  },
  argTypes: {
    onDismiss: { action: "dismiss-clicked" },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Texto de feedback",
    state: "success",
    device: "desktop",
  },
};

export const PorTamanho: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <strong>Desktop</strong>
        <Toast title="Texto de feedback" state="success" device="desktop" />
        <Toast title="Texto de feedback" state="error" device="desktop" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <strong>Mobile</strong>
        <Toast title="Texto de feedback" state="success" device="mobile" />
        <Toast title="Texto de feedback" state="error" device="mobile" />
      </div>
    </div>
  ),
};

export const PorTipoDeAviso: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <strong>Success</strong>
        <Toast title="Texto de feedback" state="success" device="desktop" />
        <Toast title="Texto de feedback" state="success" device="mobile" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <strong>Error</strong>
        <Toast title="Texto de feedback" state="error" device="desktop" />
        <Toast title="Texto de feedback" state="error" device="mobile" />
      </div>
    </div>
  ),
};
