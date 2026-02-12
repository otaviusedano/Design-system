import type { Meta, StoryObj } from "@storybook/react";

import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Stepper com navegação lateral conforme o design do Figma.",
      },
    },
  },
  args: {
    device: "desktop",
    totalSteps: 4,
    currentStep: 1,
    stepLabel: "Etapa",
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const DesktopStep2: Story = {
  args: {
    device: "desktop",
    totalSteps: 4,
    currentStep: 2,
  },
};

export const DesktopStep6Of8: Story = {
  args: {
    device: "desktop",
    totalSteps: 8,
    currentStep: 6,
  },
};

export const MobileStep1: Story = {
  args: {
    device: "mobile",
    totalSteps: 2,
    currentStep: 1,
  },
};

export const MobileStep6Of8: Story = {
  args: {
    device: "mobile",
    totalSteps: 8,
    currentStep: 6,
  },
};
