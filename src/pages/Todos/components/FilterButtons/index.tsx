interface FilterButtonsProps {
  selectedFilter: 'All' | 'Todo' | 'Done';
  onFilterChange: (filter: 'All' | 'Todo' | 'Done') => void;
}

function FilterButtons({ selectedFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="inline-flex items-start justify-start gap-2">
      <div
        className={`flex items-center justify-center gap-2.5 rounded-[17px] border ${
          selectedFilter === 'All'
            ? 'border-blue-500 bg-blue-500'
            : 'border-slate-200 bg-white'
        } cursor-pointer px-3 py-1`}
        onClick={() => onFilterChange('All')}
      >
        <div
          className={`text-sm font-medium leading-tight ${
            selectedFilter === 'All' ? 'text-white' : 'text-slate-800'
          }`}
        >
          All
        </div>
      </div>
      <div
        className={`flex items-center justify-center gap-2.5 rounded-[17px] border ${
          selectedFilter === 'Todo'
            ? 'border-blue-500 bg-blue-500'
            : 'border-slate-200 bg-white'
        } cursor-pointer px-3 py-1`}
        onClick={() => onFilterChange('Todo')}
      >
        <div
          className={`text-sm font-medium leading-tight ${
            selectedFilter === 'Todo' ? 'text-white' : 'text-slate-800'
          }`}
        >
          To do
        </div>
      </div>
      <div
        className={`flex items-center justify-center gap-2.5 rounded-[17px] border ${
          selectedFilter === 'Done'
            ? 'border-blue-500 bg-blue-500'
            : 'border-slate-200 bg-white'
        } cursor-pointer px-3 py-1`}
        onClick={() => onFilterChange('Done')}
      >
        <div
          className={`text-sm font-medium leading-tight ${
            selectedFilter === 'Done' ? 'text-white' : 'text-slate-800'
          }`}
        >
          Done
        </div>
      </div>
    </div>
  );
}

export default FilterButtons;
