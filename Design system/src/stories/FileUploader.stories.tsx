import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { FileUploader } from "./FileUploader";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta: Meta<typeof FileUploader> = {
  title: "Components/FileUploader",
  component: FileUploader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: {
      viewports: [360, 768, 1200],
    },
    docs: {
      description: {
        component:
          "Uploader oficial do sistema Codex Topaz, seguindo as cores, estados e comportamento descritos no Figma.",
      },
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "focus", "uploaded", "error", "disabled"],
    },
    onRemove: { action: "remove" },
  },
  args: {
    title: "Arraste e solte o arquivo aqui",
    description: "ou selecione um arquivo do seu computador",
    buttonLabel: "Selecionar arquivo",
    helperText: "PDF, PNG ou JPG • até 10MB",
    accept: ".pdf,.png,.jpg,.jpeg",
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
    errorText: "Formato inválido. Envie um arquivo de até 10MB.",
  },
};

export const Disabled: Story = {
  args: {
    state: "disabled",
    helperText: "Envios temporariamente desativados.",
  },
};

export const Uploaded: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([
      new File(["mock"], "documento.pdf", { type: "application/pdf" }),
      new File(["mock"], "contrato-assinado.png", { type: "image/png" }),
    ]);

    return (
      <FileUploader
        {...args}
        multiple
        value={files}
        onChange={setFiles}
        onRemove={(index) =>
          setFiles((prev) => prev.filter((_, i) => i !== index))
        }
        helperText="2 arquivos anexados • até 10MB"
      />
    );
  },
};

export const InteractionUpload: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return <FileUploader {...args} value={files} onChange={setFiles} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvasElement.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const file = new File(["hello"], "imagem.png", {
      type: "image/png",
    });

    await userEvent.upload(input, file);
    await canvas.findByText("imagem.png");

    // Remove o arquivo novamente para documentar o fluxo completo
    const removeButton = await canvas.findByRole("button", {
      name: /remover/i,
    });
    await userEvent.click(removeButton);
    await waitFor(() =>
      expect(canvas.queryByText("imagem.png")).not.toBeInTheDocument(),
    );
  },
};
