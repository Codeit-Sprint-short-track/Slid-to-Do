import { Meta, StoryObj } from '@storybook/react';
import Kebab from '.';

const meta: Meta<typeof Kebab> = {
  title: 'Components/Kebab',
  component: Kebab,
};

export default meta;

type Story = StoryObj<typeof Kebab>;

export const Default: Story = {
  args: {
    isSmall: false,
  },
};

export const SmallKebab: Story = {
  args: {
    isSmall: true,
  },
};
