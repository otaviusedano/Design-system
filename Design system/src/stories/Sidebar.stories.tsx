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

const topazLogo =
  'https://www.figma.com/api/mcp/asset/fa5eaefd-841e-4952-ac0b-caa8e239e019';
const topazMark =
  'https://www.figma.com/api/mcp/asset/aa3e56d9-f2fe-4e7f-8c2e-43ba3f8d0444';
const avatarImage =
  'https://www.figma.com/api/mcp/asset/c83ce26b-ef0f-4b44-994c-effcecec5577';

const TopazLogo = () => (
  <img src={topazLogo} alt="Topaz" width="168" height="44" />
);

const TopazMark = () => (
  <img src={topazMark} alt="Topaz" width="32" height="32" />
);

const AvatarImage = () => (
  <img src={avatarImage} alt="Foto do usuário" width="24" height="24" />
);

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M6 6l12 12M18 6l-12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
    device: 'desktop',
    state: 'expanded',
    header: {
      onBack: () => console.log('Back clicked'),
      brandIcon: <TopazLogo />,
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

export const Collapsed: Story = {
  args: {
    device: 'desktop',
    state: 'collected',
    header: {
      onBack: () => console.log('Menu clicked'),
      backIcon: <MenuIcon />,
      brandIcon: <TopazMark />,
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
    user: {
      avatar: <AvatarImage />,
      name: 'Lídia Fonseca',
      isOnline: true,
    },
    copyright: '© 2025 Todos os direitos reservados. Stefanini Group',
    activeId: 'link1',
  },
};

export const Mobile: Story = {
  args: {
    device: 'mobile',
    state: 'default',
    header: {
      mobileContent: (
        <div className="storybook-sidebar__mobile-header-content">
          <div className="storybook-sidebar__mobile-field">
            <span className="storybook-sidebar__mobile-label">Usuário</span>
            <div className="storybook-sidebar__mobile-input">
              <span className="storybook-sidebar__mobile-placeholder">
                Placeholder
              </span>
            </div>
          </div>
          <div className="storybook-sidebar__mobile-menu">
            <button
              type="button"
              className="storybook-sidebar__icon-button"
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>
            <span className="storybook-sidebar__mobile-title">Atendimento</span>
            <span className="storybook-sidebar__mobile-arrow">
              <ChevronRightIcon />
            </span>
          </div>
        </div>
      ),
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
    user: {
      avatar: <AvatarImage />,
      name: 'Lídia Fonseca',
      isOnline: true,
    },
    copyright: '© 2025 Todos os direitos reservados. Stefanini Group',
    activeId: 'link1',
  },
};
