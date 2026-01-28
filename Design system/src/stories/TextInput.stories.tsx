import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './TextInput';

const meta = {
  title: 'Form/Text Input',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Digite aqui...',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/X3O3uFqKk8ITqBc9CmTe8l/Design-System---Topaz?node-id=72-139&t=cyoEHFuYif50QlIb-4',
    },
    layout: 'centered',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focus: Story = {
  args: {
    placeholder: 'Selecione a opção',
    autoFocus: true,
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'Valor preenchido',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Campo desabilitado',
  },
};

export const Error: Story = {
  args: {
    errorText: 'Mensagem de erro',
    placeholder: 'Campo com erro',
  },
};

export const Price: Story = {
  args: {
    label: 'Price',
    prefix: 'R$',
    placeholder: '0,00',
  },
};

export const Percent: Story = {
  args: {
    label: 'Percent',
    suffix: '%',
    placeholder: '0',
  },
};

export const Range: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Range</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <TextInput placeholder="Ex: 1" aria-label="Valor mínimo" />
        <TextInput placeholder="Ex: 99" aria-label="Valor máximo" />
      </div>
    </div>
  ),
};

export const TextArea: Story = {
  args: {
    label: 'Text area',
    multiline: true,
    rows: 4,
    placeholder: 'Escreva sua mensagem...',
  },
};

export const LayoutExamples: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 340 }}>
      <TextInput label="Horizontal" prefix="R$" placeholder="Ex: 123,45" />
      <TextInput label="Altitude" suffix="m" placeholder="Altitude" />
      <TextInput label="Margem" suffix="px" placeholder="Ex: 16" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <TextInput label="Largura" placeholder="L" />
        <TextInput label="Altura" placeholder="A" />
      </div>
    </div>
  ),
};
