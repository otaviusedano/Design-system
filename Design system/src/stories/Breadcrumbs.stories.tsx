import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=743-10305&m=dev',
    },
    layout: 'centered',
  },
  argTypes: {
    items: {
      control: false,
    },
    separator: {
      control: false,
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '#',
      },
      {
        id: 'products',
        label: 'Produtos',
        href: '#',
      },
      {
        id: 'category',
        label: 'Categoria',
        href: '#',
      },
      {
        id: 'current',
        label: 'Produto Atual',
      },
    ],
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        onClick: () => console.log('Home clicked'),
      },
      {
        id: 'products',
        label: 'Produtos',
        onClick: () => console.log('Products clicked'),
      },
      {
        id: 'current',
        label: 'Produto Atual',
      },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '#',
      },
      {
        id: 'current',
        label: 'Página Atual',
      },
    ],
  },
};

export const LongBreadcrumb: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '#',
      },
      {
        id: 'section1',
        label: 'Seção 1',
        href: '#',
      },
      {
        id: 'section2',
        label: 'Seção 2',
        href: '#',
      },
      {
        id: 'section3',
        label: 'Seção 3',
        href: '#',
      },
      {
        id: 'section4',
        label: 'Seção 4',
        href: '#',
      },
      {
        id: 'current',
        label: 'Página Atual',
      },
    ],
  },
};
