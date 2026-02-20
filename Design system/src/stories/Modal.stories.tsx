import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Modal do sistema Topaz seguindo o design do Figma com variacoes de tamanho e botoes.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    showIllustration: { control: "boolean" },
    showGhostButton: { control: "boolean" },
    onClose: { action: "close" },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
  },
  args: {
    open: true,
    title: "Titulo aqui",
    description: "Texto de apoio aqui",
    showIllustration: false,
    showGhostButton: false,
    onClose: () => {},
    outlinedAction: {
      label: "Button",
      onClick: () => {},
    },
    primaryAction: {
      label: "Button",
      onClick: () => {},
    },
    ghostAction: {
      label: "Button",
      onClick: () => {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
    showIllustration: false,
    showGhostButton: false,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    showIllustration: true,
    showGhostButton: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    showIllustration: true,
    showGhostButton: true,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    showIllustration: true,
    showGhostButton: true,
  },
};
