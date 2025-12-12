import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";

import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Toast informativo do sistema Codex Topaz, utilizando os tokens semânticos para estados de sucesso e erro.",
      },
    },
  },
  argTypes: {
    onAction: { action: "action-clicked" },
    onDismiss: { action: "dismiss-clicked" },
    state: {
      control: "select",
      options: ["success", "error"],
    },
    layout: {
      control: "inline-radio",
      options: ["desktop", "mobile"],
    },
  },
  args: {
    title: "Texto de feedback",
    onDismiss: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    state: "error",
    title: "Não foi possível enviar",
    description: "Tente novamente em alguns instantes.",
  },
};

export const Interaction: Story = {
  args: {
    actionLabel: "Ver detalhes",
    onAction: fn(),
    onDismiss: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const actionButton = await canvas.findByRole("button", {
      name: /ver detalhes/i,
    });
    await userEvent.click(actionButton);
    expect(args.onAction).toHaveBeenCalledTimes(1);

    const dismissButton = await canvas.findByRole("button", { name: /fechar/i });
    await userEvent.click(dismissButton);
    expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};
