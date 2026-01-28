import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=747-15264&m=dev',
    },
    layout: 'centered',
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
    onPageChange: {
      action: 'page changed',
    },
    itemsPerPage: {
      control: { type: 'number' },
    },
    onItemsPerPageChange: {
      action: 'items per page changed',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
            args.onItemsPerPageChange?.(value);
          }}
        />
      </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
  },
};

export const MiddlePage: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 5);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
            args.onItemsPerPageChange?.(value);
          }}
        />
      </div>
    );
  },
  args: {
    currentPage: 5,
    totalPages: 10,
    itemsPerPage: 10,
  },
};

export const LastPage: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 10);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
            args.onItemsPerPageChange?.(value);
          }}
        />
      </div>
    );
  },
  args: {
    currentPage: 10,
    totalPages: 10,
    itemsPerPage: 10,
  },
};

export const FewPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
            args.onItemsPerPageChange?.(value);
          }}
        />
      </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 3,
    itemsPerPage: 10,
  },
};

export const ManyPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const [itemsPerPage, setItemsPerPage] = useState(args.itemsPerPage || 10);
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            args.onPageChange?.(page);
          }}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
            args.onItemsPerPageChange?.(value);
          }}
        />
      </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 20,
    itemsPerPage: 10,
  },
};
