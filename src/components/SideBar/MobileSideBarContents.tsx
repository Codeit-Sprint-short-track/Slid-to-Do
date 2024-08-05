import {
  FlagIcon,
  HomeIcon,
  PlusIcon,
  ProfileIcon,
  TextLogoIcon,
} from '@assets';
import Button from '@components/Button';
import usePostGoals from '@hooks/api/goalsAPI/usePostGoals';
import useOutsideClick from '@hooks/useOutsideClick';
import { useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useRef, useState } from 'react';

function MobileSideBarContents({
  userData,
  goalData,
}: {
  userData: { name: string; email: string };
  goalData: { title: string; id: number }[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  useOutsideClick(inputRef, () => setIsEditing(false));

  const handleAddGoalBtn = (e: MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const onSettled = () =>
    queryClient.invalidateQueries({ queryKey: ['goals'] });

  const { mutate, isPending } = usePostGoals(onSettled);

  return (
    <div className="flex-col">
      <TextLogoIcon />
      <div className="mb-6 mt-4 flex flex-row justify-between">
        <div className="flex flex-row">
          <ProfileIcon width={32} height={32} />
          <div className="ml-3 flex flex-col items-start justify-between">
            <div className="h-4 text-xs font-semibold leading-5 text-slate-800">
              {userData.name}
            </div>
            <div className="h-4 text-xs font-medium leading-5 text-slate-600">
              {userData.email}
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <button type="button">
            <span className="text-xs font-normal leading-4 text-slate-400">
              로그아웃
            </span>
          </button>
        </div>
      </div>

      <div className="absolute left-0 w-full border-b-[1px]" />

      <div className="my-3 mt-9 flex h-8 flex-row items-center justify-between">
        <div className="flex flex-row">
          <HomeIcon width={24} height={24} />
          <div className="ml-2 text-lg font-medium text-slate-800">
            대시보드
          </div>
        </div>
        <Button shape="solid" size="xs">
          <PlusIcon width={16} height={16} className="stroke-white" />
          <span className="ml-0.5 text-sm font-semibold">새 할 일</span>
        </Button>
      </div>

      <div className="absolute left-0 w-full border-b-[1px]" />

      <div className="my-4 mt-8 flex h-8 flex-row items-center justify-between">
        <div className="flex flex-row">
          <FlagIcon width={24} height={24} fill="#1E293B" />
          <div className="ml-2 text-lg font-medium text-slate-800">목표</div>
        </div>
        <Button
          shape="outlined"
          size="xs"
          onClick={(e) => handleAddGoalBtn(e)}
          disabled={isEditing}
        >
          <PlusIcon
            width={16}
            height={16}
            className={` ${isEditing ? 'stroke-slate-400' : 'stroke-blue-500'}`}
          />
          <span className="ml-0.5 text-sm font-semibold">새 목표</span>
        </Button>
      </div>
      <ul>
        {goalData.map((item) => (
          <li key={item.id} className="p-2 text-sm font-medium text-slate-700">
            • {item.title}
          </li>
        ))}
        {isPending && (
          <li className="p-2 text-sm font-medium text-slate-700">
            • {newGoal}
          </li>
        )}
        {isEditing && (
          <li className="flex items-center p-2 text-sm font-medium text-slate-700">
            <span>•</span>
            <input
              ref={inputRef}
              className="ml-1 h-8 w-max flex-grow rounded-md border border-gray-300 p-2 text-sm"
              placeholder="새 목표를 입력해주세요"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setIsEditing(false);
                  mutate(newGoal);
                }
              }}
            />
          </li>
        )}
      </ul>
    </div>
  );
}

export default MobileSideBarContents;
