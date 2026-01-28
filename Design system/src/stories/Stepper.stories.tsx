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
          "Stepper do sistema Codex Topaz conforme o design do Figma.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
    activeStep: 1,
    steps: [
      { id: "step-1", label: "Dados pessoais" },
      { id: "step-2", label: "Documentos" },
      { id: "step-3", label: "Revisao" },
      { id: "step-4", label: "Confirmacao" },
      { id: "step-5", label: "Pagamento" },
      { id: "step-6", label: "Finalizado" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    activeStep: 3,
  },
};
