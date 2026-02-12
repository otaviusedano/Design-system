import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from "./FileUploader";

const meta: Meta<typeof FileUploader> = {
  title: "Components/FileUploader",
  component: FileUploader,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=358-438&m=dev",
    },
    layout: "centered",
    chromatic: {
      viewports: [360, 768, 1200],
    },
    docs: {
      description: {
        component:
          "Componente de seleção de arquivo no estilo do design system Topaz. Estados: default, focus, uploaded e error.",
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "focus", "uploaded", "error"],
    },
  },
  args: {
    actionText: "clique para selecionar",
    helperText: "Deve ter no máximo 25mb e ser PNG ou JPEG",
    errorText: "Arquivo muito grande ou não é PNG ou JPEG",
    fileName: "RG_FRENTE.PNG",
    successText: "Arquivo enviado com sucesso",
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {};

export const Focus: Story = {
  args: {
    state: "focus",
  },
};

export const Error: Story = {
  args: {
    state: "error",
  },
};

export const Uploaded: Story = {
  args: {
    state: "uploaded",
  },
};
