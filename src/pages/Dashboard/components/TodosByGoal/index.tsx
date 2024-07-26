import { FlagIcon } from '@assets';
import { mockGoalsData } from '../mockData';
import TodosByGoalBox from './TodosByGoalBox';

function TodosByGoal() {
  return (
    <div className="mt-6 w-full rounded-xl bg-white px-6 pb-6 pt-4">
      <div className="flex items-center">
        <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-[15px] bg-[#F97316]">
          <FlagIcon fill="white" width={24} height={24} />
        </div>
        <div className="text-lg font-semibold leading-7 text-slate-800">
          목표별 할 일
        </div>
      </div>
      {mockGoalsData ? (
        <div className="mt-4 max-h-[616px] overflow-y-auto">
          {mockGoalsData.goals.map((goal) => (
            <TodosByGoalBox key={goal.id} title={goal.title} />
          ))}
        </div>
      ) : (
        <div className="flex h-[616px] items-center justify-center text-sm font-normal text-slate-500">
          등록한 목표가 없어요
        </div>
      )}
    </div>
  );
}

export default TodosByGoal;
