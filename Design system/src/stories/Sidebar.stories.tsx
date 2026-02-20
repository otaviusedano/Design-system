import type { Meta, StoryObj } from '@storybook/react-vite';

import { Sidebar } from './Sidebar';

const HomeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <polyline
      points="9 22 9 12 15 12 15 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const BrandIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="15" stroke="url(#gradient1)" strokeWidth="2" fill="none" />
    <circle cx="16" cy="16" r="11" stroke="url(#gradient2)" strokeWidth="1.5" fill="none" />
    <circle cx="16" cy="16" r="7" stroke="url(#gradient3)" strokeWidth="1" fill="none" />
    <defs>
      <linearGradient id="gradient1" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="gradient3" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const AvatarImage = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#dbeafe" />
    <circle cx="20" cy="16" r="6" fill="#3b82f6" />
    <path
      d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12"
      fill="#3b82f6"
    />
  </svg>
);

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=732-786&m=dev',
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: {
      onBack: () => console.log('Back clicked'),
      brandIcon: <BrandIcon />,
      brandText: 'topaz',
    },
    items: [
      {
        id: 'link1',
        label: 'Link',
        icon: <HomeIcon />,
      },
      {
        id: 'link2',
        label: 'Link',
        icon: <HomeIcon />,
        hasArrow: true,
      },
      {
        id: 'link3',
        label: 'Link',
        icon: <HomeIcon />,
        hasArrow: true,
      },
      {
        id: 'link4',
        label: 'Link',
        icon: <HomeIcon />,
        hasArrow: true,
      },
      {
        id: 'link5',
        label: 'Link',
        icon: <HomeIcon />,
        hasArrow: true,
      },
      {
        id: 'link6',
        label: 'Link',
        icon: <HomeIcon />,
      },
      {
        id: 'link7',
        label: 'Link',
        icon: <HomeIcon />,
      },
      {
        id: 'link8',
        label: 'Link',
        icon: <HomeIcon />,
      },
    ],
    user: {
      avatar: <AvatarImage />,
      name: 'Lídia Fonseca',
      isOnline: true,
    },
    copyright: '© 2025 Todos os direitos reservados. Stefanini Group',
    activeId: 'link1',
    onSelect: (id) => {
      console.log('Selected:', id);
    },
  },
};

export const WithoutBack: Story = {
  args: {
    header: {
      brandIcon: <BrandIcon />,
      brandText: 'topaz',
    },
    items: [
      {
        id: 'link1',
        label: 'Link',
        icon: <HomeIcon />,
      },
      {
        id: 'link2',
        label: 'Link',
        icon: <HomeIcon />,
      },
    ],
    activeId: 'link1',
  },
};

export const WithoutUser: Story = {
  args: {
    header: {
      onBack: () => console.log('Back clicked'),
      brandIcon: <BrandIcon />,
      brandText: 'topaz',
    },
    items: [
      {
        id: 'link1',
        label: 'Link',
        icon: <HomeIcon />,
      },
      {
        id: 'link2',
        label: 'Link',
        icon: <HomeIcon />,
      },
    ],
    copyright: '© 2025 Todos os direitos reservados. Stefanini Group',
    activeId: 'link1',
  },
};
