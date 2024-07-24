/* eslint-disable */

import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Popup, { PopupProps } from '.';

const meta: Meta<typeof Popup> = {
  component: Popup,
};
export default meta;
type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  render: (args: PopupProps) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return <></>;
    return (
      <Popup
        {...args}
        onCancel={() => setIsVisible(false)}
        onConfirm={() => setIsVisible(false)}
      />
    );
  },
  args: {
    message: `정말 나가시겠어요?\n작성된 내용이 모두 삭제됩니다.`,
  },
};

export const SingleButton: Story = {
  render: (args: PopupProps) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return <></>;
    return (
      <Popup
        {...args}
        onCancel={() => setIsVisible(false)}
        onConfirm={() => setIsVisible(false)}
      />
    );
  },
  args: {
    message: '가입이 완료되었습니다!',
    singleButton: true,
  },
};

export const ConfirmMessage: Story = {
  render: (args: PopupProps) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return <></>;
    return (
      <Popup
        {...args}
        onCancel={() => setIsVisible(false)}
        onConfirm={() => setIsVisible(false)}
      />
    );
  },
  args: {
    message: `'자바스크립트 기초'\n제목의 노트를 불러오시겠어요?`,
    confirmMessage: '불러오기',
  },
};

export const Full: Story = {
  render: (args: PopupProps) => {
    const [isVisible, setIsVisible] = useState(true);
    if (!isVisible) return <></>;
    return (
      <Popup
        {...args}
        onCancel={() => setIsVisible(false)}
        onConfirm={() => setIsVisible(false)}
      />
    );
  },
  args: {
    message: '전체 예제 팝업 메시지입니다.',
    confirmMessage: '불러오기',
    singleButton: false,
  },
};
