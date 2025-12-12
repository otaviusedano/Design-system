import type { Meta, StoryObj } from '@storybook/react-vite';

import { DropdownAction } from './DropdownAction';

const defaultItems = [
  {
    label: 'Copiar link',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M9 12a3 3 0 013-3h5a3 3 0 110 6h-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 12a3 3 0 01-3 3H7a3 3 0 110-6h1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Editar',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.06 6.19l1.77-1.77a1.5 1.5 0 112.12 2.12l-1.77 1.77"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Deletar',
    danger: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M9 11v6m6-6v6M5 7h14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 7l-.87 12.12A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.88L5 7m3-3h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 4h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const meta = {
  title: 'Actions/Dropdown Action',
  component: DropdownAction,
  tags: ['autodocs'],
  args: {
    items: defaultItems,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=72-139&t=cyoEHFuYif50QlIb-4',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClosedDefault: Story = {};

export const ClosedFocus: Story = {
  args: {
    isFocused: true,
  },
};

export const Opened: Story = {
  args: {
    defaultOpen: true,
  },
};

