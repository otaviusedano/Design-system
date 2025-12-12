import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import React, { useState } from "react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Switch oficial do sistema Codex Topaz, seguindo as diretrizes de estados, espaçamentos e alinhamentos fornecidas no Figma.",
      },
    },
  },
  args: {
    label: "Receber notificações por e-mail",
    helperText: "Ative para ser avisado sempre que houver atualizações.",
    description: "Mantém você informado em tempo real.",
  },
  argTypes: {
    onCheckedChange: { action: "checked-change" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Activated: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <Switch
        {...args}
        checked={checked}
        onCheckedChange={(next) => setChecked(next)}
      />
    );
  },
};

export const Focus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("switch");
    input.focus();
    await waitFor(() => expect(input).toHaveFocus());
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Configuração controlada pelo administrador.",
  },
};

export const InteractionToggle: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole("switch");

    await userEvent.click(switchInput);
    await waitFor(() => expect(switchInput).toHaveAttribute("aria-checked", "true"));

    await userEvent.click(switchInput);
    await waitFor(() => expect(switchInput).toHaveAttribute("aria-checked", "false"));
  },
};
