import type { Meta, StoryObj } from '@storybook/react-vite';

import { CategoryCarousel, type CategoryItem } from './CategoryCarousel';

const HouseIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4L4 12V28H12V20H20V28H28V12L16 4Z"
      stroke="#1a1a6b"
      strokeWidth="2"
      fill={filled ? '#1a1a6b' : 'none'}
    />
    <rect
      x="14"
      y="16"
      width="4"
      height="6"
      stroke="#1a1a6b"
      strokeWidth="2"
      fill={filled ? '#1a1a6b' : 'none'}
    />
  </svg>
);

const CarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 16L6 12H12L14 8H18L20 12H26L28 16V24H26V28H24V24H8V28H6V24H4V16Z"
      stroke="#1a1a6b"
      strokeWidth="2"
      fill={filled ? '#1a1a6b' : 'none'}
    />
    <circle cx="10" cy="20" r="2" fill={filled ? '#1a1a6b' : 'none'} stroke="#1a1a6b" strokeWidth="2" />
    <circle cx="22" cy="20" r="2" fill={filled ? '#1a1a6b' : 'none'} stroke="#1a1a6b" strokeWidth="2" />
  </svg>
);

const MotorcycleIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="24" r="4" stroke="#1a1a6b" strokeWidth="2" fill={filled ? '#1a1a6b' : 'none'} />
    <circle cx="24" cy="24" r="4" stroke="#1a1a6b" strokeWidth="2" fill={filled ? '#1a1a6b' : 'none'} />
    <path
      d="M12 20L16 12L20 16L24 8"
      stroke="#1a1a6b"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M8 20L12 20" stroke="#1a1a6b" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TruckIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="12" width="16" height="12" stroke="#1a1a6b" strokeWidth="2" fill={filled ? '#1a1a6b' : 'none'} />
    <path d="M20 12H28L30 16V24H28" stroke="#1a1a6b" strokeWidth="2" />
    <path d="M20 20H24" stroke="#1a1a6b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="26" r="2" fill={filled ? '#1a1a6b' : 'none'} stroke="#1a1a6b" strokeWidth="2" />
    <circle cx="26" cy="26" r="2" fill={filled ? '#1a1a6b' : 'none'} stroke="#1a1a6b" strokeWidth="2" />
  </svg>
);

const ServicesIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4L20 8H24V12L28 16L24 20V24H20L16 28L12 24H8V20L4 16L8 12V8H12L16 4Z"
      stroke="#1a1a6b"
      strokeWidth="2"
      fill={filled ? '#1a1a6b' : 'none'}
    />
    <path d="M16 12L20 16L16 20L12 16L16 12Z" stroke="#1a1a6b" strokeWidth="2" fill={filled ? '#1a1a6b' : 'none'} />
  </svg>
);

const BoatIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20L8 16H12L16 12L20 16H24L28 20V24H4V20Z"
      stroke="#1a1a6b"
      strokeWidth="2"
    />
    <path d="M16 8V12" stroke="#1a1a6b" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlaneIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4L20 8L28 6L30 14L24 16L28 24L20 22L16 28L12 22L4 24L6 16L2 14L4 6L12 8L16 4Z"
      stroke="#1a1a6b"
      strokeWidth="2"
    />
  </svg>
);

const BikeIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="24" r="4" stroke="#1a1a6b" strokeWidth="2" />
    <circle cx="24" cy="24" r="4" stroke="#1a1a6b" strokeWidth="2" />
    <path d="M12 20L16 8L20 12L24 8" stroke="#1a1a6b" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const categories: CategoryItem[] = [
  {
    id: 'imoveis',
    label: 'Imóveis',
    icon: <HouseIcon />,
  },
  {
    id: 'automoveis',
    label: 'Automóveis',
    icon: <CarIcon />,
  },
  {
    id: 'motocicletas',
    label: 'Motocicletas',
    icon: <MotorcycleIcon />,
  },
  {
    id: 'caminhoes',
    label: 'Caminhões',
    icon: <TruckIcon />,
  },
  {
    id: 'servicos',
    label: 'Serviços',
    icon: <ServicesIcon />,
  },
  {
    id: 'barcos',
    label: 'Barcos',
    icon: <BoatIcon />,
  },
  {
    id: 'avioes',
    label: 'Aviões',
    icon: <PlaneIcon />,
  },
  {
    id: 'bicicletas',
    label: 'Bicicletas',
    icon: <BikeIcon />,
  },
  {
    id: 'equipamentos',
    label: 'Equipamentos',
    icon: <ServicesIcon />,
  },
  {
    id: 'maquinas',
    label: 'Máquinas',
    icon: <TruckIcon />,
  },
];

const meta = {
  title: 'Navigation/Category Carousel',
  component: CategoryCarousel,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=472-8081&m=dev',
    },
    layout: 'padded',
  },
} satisfies Meta<typeof CategoryCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories,
  },
};

export const WithSelection: Story = {
  args: {
    categories,
    selectedId: 'imoveis',
    onSelect: (id) => {
      console.log('Selected:', id);
    },
  },
};

export const WithoutNavigation: Story = {
  args: {
    categories,
    showNavigation: false,
  },
};
