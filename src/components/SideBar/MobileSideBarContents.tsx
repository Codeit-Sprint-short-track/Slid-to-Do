import { FlagIcon, HomeIcon, PlusIcon } from '@assets';
import Button from '@components/Button';
import routes from '@constants/routes';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalList from './GoalList';
import Header from './Header';
import usePostControl from './usePostControl';

interface MobileSideBarContentsProps {
  userData: { name: string; email: string };
  goalData: { title: string; id: number }[];
  toggleSideBar: () => void;
  handleShowTodoModal: () => void;
  handleShowDeletePopup: (goalId: number) => void;
}

function MobileSideBarContents({
  userData,
  goalData,
  toggleSideBar,
  handleShowTodoModal,
  handleShowDeletePopup,
}: MobileSideBarContentsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    handleAddGoalBtn,
    handleAddPostGoal,
    isEditing,
    newGoal,
    setNewGoal,
    isPending,
  } = usePostControl(inputRef);

  return (
    <div className="flex-col">
      <Header userData={userData} toggleSideBar={toggleSideBar} />

      <div className="absolute left-0 w-full border-b-[1px]" />

      <div className="my-3 mt-9 flex h-8 flex-row items-center justify-between">
        <div
          className="flex cursor-pointer flex-row"
          onClick={() => {
            navigate(`${routes.dashboard}`);
            toggleSideBar();
          }}
        >
          <HomeIcon width={24} height={24} />
          <div className="ml-2 text-lg font-medium text-slate-800">
            대시보드
          </div>
        </div>
        <Button shape="solid" size="xs" onClick={handleShowTodoModal}>
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
          onClick={handleAddGoalBtn}
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
      <GoalList
        isEditing={isEditing}
        inputRef={inputRef}
        newGoal={newGoal}
        setNewGoal={setNewGoal}
        handleAddPostGoal={handleAddPostGoal}
        isPending={isPending}
        goalData={goalData}
        toggleSideBar={toggleSideBar}
        handleShowDeletePopup={handleShowDeletePopup}
      />
    </div>
  );
}

export default MobileSideBarContents;
