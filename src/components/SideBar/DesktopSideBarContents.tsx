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
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DesktopSideBarContents({
  userData,
  goalData,
  toggleSideBar,
  setShowTodoModal,
}: {
  userData: { name: string; email: string };
  goalData: { title: string; id: number }[];
  toggleSideBar: () => void;
  setShowTodoModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const inputRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      <TextLogoIcon
        className="cursor-pointer"
        onClick={() => {
          navigate('/dashboard');
          toggleSideBar();
        }}
      />
      <div className="mt-4 flex flex-row">
        <ProfileIcon width={64} height={64} />
        <div className="ml-3 flex flex-col items-start justify-between">
          <div className="h-4 text-sm font-semibold leading-5 text-slate-800">
            {userData.name}
          </div>
          <div className="h-4 text-sm font-medium leading-5 text-slate-600">
            {userData.email}
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              navigate('/sign-in');
            }}
          >
            <span className="text-xs font-normal leading-4 text-slate-400">
              로그아웃
            </span>
          </button>
        </div>
      </div>
      <div className="my-6 flex justify-center">
        <Button
          shape="solid"
          size="sm"
          additionalClass="w-full"
          onClick={() => {
            setShowTodoModal(true);
          }}
        >
          <PlusIcon width={24} height={24} className="mr-2 stroke-white" />
          <span className="mr-2 text-base font-semibold">새 할 일</span>
        </Button>
      </div>
      <div className="absolute left-0 w-full border-b-[1px]"> </div>
      <div
        className="my-4 mt-10 flex h-8 cursor-pointer flex-row items-center"
        onClick={() => {
          navigate('/dashboard');
          toggleSideBar();
        }}
      >
        <HomeIcon width={24} height={24} />
        <div className="ml-2 text-lg font-medium text-slate-800">대시보드</div>
      </div>
      <div className="absolute left-0 w-full border-b-[1px]"> </div>
      <div className="my-4 mt-8 flex h-8 flex-row items-center">
        <FlagIcon width={24} height={24} fill="#1E293B" />
        <div className="ml-2 text-lg font-medium text-slate-800">목표</div>
      </div>
      <ul>
        {goalData.map((item) => (
          <div
            onClick={() => {
              navigate('/goal-detail');
              toggleSideBar();
            }}
          >
            <li
              key={item.id}
              className="cursor-pointer p-2 text-sm font-medium text-slate-700"
            >
              • {item.title}
            </li>
          </div>
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

      <div className="mt-6 flex justify-center">
        <Button
          shape="outlined"
          size="sm"
          additionalClass="w-full"
          onClick={(e) => handleAddGoalBtn(e)}
          disabled={isEditing}
        >
          <PlusIcon
            width={24}
            height={24}
            className={`mr-2 ${isEditing ? 'stroke-slate-400' : 'stroke-blue-500'}`}
          />
          <span className="mr-2 text-base font-semibold">새 목표</span>
        </Button>
      </div>
    </div>
  );
}

export default DesktopSideBarContents;
