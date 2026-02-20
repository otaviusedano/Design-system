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
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=349-3231&m=dev",
    },
    docs: {
      description: {
        component:
          "Switch oficial do sistema Topaz, implementado conforme o componente do Figma (default, ativo, foco e desabilitado).",
      },
    },
  },
  args: {
    label: "Label",
  },
  argTypes: {
    onCheckedChange: { action: "checked-change" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Active: Story = {
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
  args: {
    defaultChecked: true,
    autoFocus: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("Aplica foco visível no switch", async () => {
      const input = canvas.getByRole("switch");
      input.focus();
      await waitFor(() => expect(input).toHaveFocus());
    });
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: "Label",
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
