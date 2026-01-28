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
          "Modal do sistema Codex Topaz com suporte a tamanhos, acoes e variantes de tom.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    tone: {
      control: "select",
      options: ["default", "danger"],
    },
    onClose: { action: "close" },
    closeOnOverlay: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
  },
  args: {
    open: true,
    title: "Confirmar alteracao",
    description:
      "Tem certeza que deseja aplicar as mudancas? Voce pode desfazer depois.",
    onClose: () => {},
    primaryAction: {
      label: "Confirmar",
      onClick: () => {},
    },
    secondaryAction: {
      label: "Cancelar",
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
    title: "Deseja sair?",
    description: "As alteracoes nao salvas serao perdidas.",
  },
};

export const LargeWithContent: Story = {
  args: {
    size: "lg",
    title: "Detalhes do contrato",
    description: "Revise as informacoes antes de prosseguir.",
    children: (
      <div>
        <p>
          Este contrato define as condicoes de uso do servico, incluindo prazos,
          metricas e responsabilidades das partes. Recomendamos a leitura completa.
        </p>
        <p>
          Ao continuar, voce confirma que leu e concorda com os termos apresentados.
        </p>
      </div>
    ),
  },
};
