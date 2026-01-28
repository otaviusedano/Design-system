import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { viewports: [360, 768, 1200] },
    docs: {
      description: {
        component:
          "Tabs do sistema Codex Topaz com variantes de linha e pill, tamanhos e itens desabilitados.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
    items: [
      {
        id: "tab-1",
        label: "Geral",
        icon: (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 3.2 16.2 6.6v6.8L10 16.8 3.8 13.4V6.6L10 3.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: "tab-2",
        label: "Detalhes",
        icon: (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 5v10M5 10h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        id: "tab-3",
        label: "Historico",
        icon: (
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M6 6h8M6 10h8M6 14h5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};
