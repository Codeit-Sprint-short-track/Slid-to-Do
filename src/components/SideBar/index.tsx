import {
  BluePlusIcon,
  FlagIcon,
  FoldIcon,
  HomeIcon,
  LogoIcon,
  PlusIcon,
  ProfileIcon,
  TextLogoIcon,
} from '@assets';
import Button from '@components/Button';
import { useState } from 'react';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const mockGoalData = {
    goals: [
      { title: '자바스크립트로 웹 서비스 만들기' },
      { title: '디자인 시스템 강의 듣기' },
    ],
  };

  return (
    <div
      className={`absolute left-0 top-0 h-dvh w-[280px] transform p-4 ${isOpen ? 'translate-x-0' : '-translate-x-[230px]'} bg-white transition-transform duration-300 ease-in-out`}
    >
      <button
        type="button"
        aria-label="expend button"
        onClick={toggleSidebar}
        className="fixed right-4 top-5 h-5 w-5"
      >
        {!isOpen && <LogoIcon width={23} height={23} className="mb-4" />}
        <FoldIcon className={`${isOpen ? 'rotate-0' : 'rotate-180'}`} />
      </button>
      {isOpen && (
        <div className="flex-col">
          <TextLogoIcon />
          <div className="mt-4 flex flex-row">
            <ProfileIcon width={64} height={64} />
            <div className="ml-2">
              <div className="h-4 text-sm">체다치즈</div>
              <div className="h-4 text-sm">chedacheese@slid.kr</div>
              <button type="button" className="mt-1">
                <span className="text-xs">로그아웃</span>
              </button>
            </div>
          </div>
          <div className="mb-4 mt-4 flex justify-center">
            <Button shape="solid" size="sm" additionalClass="w-[232px]">
              <PlusIcon className="mr-2" />
              <span className="mr-2 text-base font-medium">새 할 일</span>
            </Button>
          </div>
          <div className="absolute left-0 w-full border-b-2"> </div>
          <div className="mb-2 mt-6 flex h-8 flex-row items-center">
            <HomeIcon width={14} height={14} />
            <div className="ml-4 font-medium">대시보드</div>
          </div>
          <div className="absolute left-0 w-full border-b-2"> </div>
          <div className="mb-2 mt-4 flex h-8 flex-row items-center">
            <FlagIcon width={14} height={14} />
            <div className="ml-4 font-medium">목표</div>
          </div>
          <ul>
            {mockGoalData.goals.map((item) => (
              <li className="mt-2 text-sm">• {item.title}</li>
            ))}
            {isEditing && (
              <li>
                <span>• </span>
                <input
                  className="mt-2 h-8 w-[227px] rounded-md border border-gray-300 p-2 text-sm"
                  placeholder="새 목표를 입력해주세요"
                  onKeyDown={(event) => {
                    // TODO: 엔터키 입력 시 목표 추가
                    console.log(event.key);
                    if (event.key === 'Enter') {
                      setIsEditing(false);
                    }
                  }}
                />
              </li>
            )}
          </ul>

          <div className="mb-4 mt-4 flex justify-center">
            <Button
              shape="outlined"
              size="sm"
              additionalClass="w-[232px]"
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
            >
              <BluePlusIcon className="mr-2" />
              <span className="mr-2 text-base font-medium">새 목표</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
