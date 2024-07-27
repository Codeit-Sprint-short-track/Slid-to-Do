import { Goal, Todo } from '@/types/interface';
import Dropdown from './Dropdown';

interface GoalSectionProps {
  goals: Goal[];
  goal: Todo['goal'] | null;
  onGoalChange: (selectedOption: Todo['goal'] | null) => void;
  dropdownOpen: boolean;
  handleDropdownToggle: () => void;
}

function GoalSection({
  goals,
  goal,
  onGoalChange,
  dropdownOpen,
  handleDropdownToggle,
}: GoalSectionProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-3 self-stretch">
      <div className="text-base font-semibold leading-normal text-slate-800">
        목표
      </div>
      <div className="flex h-12 w-full items-center justify-center self-stretch rounded-xl bg-slate-50 py-3">
        <Dropdown
          options={goals}
          selectedOption={goal}
          onSelect={onGoalChange}
          placeholder="목표를 선택해주세요 (선택 안함)"
          dropdownOpen={dropdownOpen}
          onToggle={handleDropdownToggle}
        />
      </div>
    </div>
  );
}

export default GoalSection;
