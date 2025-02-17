import { Meta, StoryObj } from '@storybook/react';
import PasswordInput from '.';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['lg', 'sm'],
      control: { type: 'select' },
    },
    isInvalid: {
      options: ['true', 'false'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: 'lg',
    isInvalid: false,
    placeholder: 'placeholder',
  },
};
export const LargeInvalid: Story = {
  args: {
    size: 'lg',
    isInvalid: true,
    placeholder: 'placeholder',
  },
};
export const Small: Story = {
  args: {
    size: 'sm',
    isInvalid: false,
    placeholder: 'placeholder',
  },
};
export const SmallInvalid: Story = {
  args: {
    size: 'sm',
    isInvalid: true,
    placeholder: 'placeholder',
  },
};
