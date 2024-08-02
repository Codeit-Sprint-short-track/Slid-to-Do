import { Todo } from '@/types/interface';
import { PlusBlueIcon } from '@assets';
import TodoItem from '@components/TodoItem';
import TodoCreateModal from '@components/TodoModal/TodoCreateModal';
import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';
import cn from '@utils/cn';
import { useEffect, useState } from 'react';
import FilterButtons from './components/FilterButtons';
import mockTodos from './mockTodos';

function TodosPage() {
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  const mobileHeight = windowHeight - 88;
  const defaultHeight = windowHeight - 196;
  const tabletHeight = windowHeight - 184;

  const containerClass = cn('w-full overflow-auto rounded-xl', {
    'tablet:h-dvh': windowWidth >= 744,
  });

  const style =
    windowWidth >= 744
      ? { height: `${tabletHeight}px` }
      : { height: `${defaultHeight}px` };

  const entireContainerClass = cn(
    'flex w-full flex-col gap-4 p-4 tablet:p-6 desktop:w-[1152px] desktop:py-6 desktop:pl-[360px]',
    {
      'tablet:h-dvh': windowWidth >= 744,
    },
  );
  const entireContainerStyle =
    windowWidth >= 744 ? {} : { height: `${mobileHeight}px` };

  const [isTodoCreateModalVisible, setIsTodoCreateModalVisible] =
    useState(false);

  const handleOpenModal = () => {
    setIsTodoCreateModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsTodoCreateModalVisible(false);
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Todo' | 'Done'>('All');

  useEffect(() => {
    // GET
    setTodos(mockTodos);
  }, []);

  const getFilteredTodos = () => {
    switch (filter) {
      case 'Todo':
        return todos.filter((todo) => !todo.done);
      case 'Done':
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  };

  return (
    <div className={entireContainerClass} style={entireContainerStyle}>
      <div className="flex w-full items-center justify-between">
        <div className="text-base font-semibold leading-normal text-slate-900 tablet:text-lg tablet:leading-7">
          모든 할 일 ({todos.length})
        </div>
        <div
          className="inline-flex cursor-pointer items-center justify-start gap-1 self-stretch"
          onClick={handleOpenModal}
        >
          <PlusBlueIcon className="relative h-4 w-4" />
          <div className="text-sm font-semibold leading-tight text-blue-500">
            할일 추가
          </div>
        </div>
      </div>
      <div className="box-border inline-flex h-full w-full flex-grow flex-col items-start justify-start gap-4 self-stretch rounded-xl border border-slate-100 bg-white p-6">
        <FilterButtons selectedFilter={filter} onFilterChange={setFilter} />
        <div className={containerClass} style={style}>
          {getFilteredTodos().length === 0 ? (
            <div className="flex h-full w-full items-center justify-center">
              {filter === 'All' && (
                <p className="text-sm leading-tight text-slate-500">
                  등록한 할 일이 없어요
                </p>
              )}
              {filter === 'Todo' && (
                <p className="text-sm leading-tight text-slate-500">
                  해야할 일이 아직 없어요
                </p>
              )}
              {filter === 'Done' && (
                <p className="text-sm leading-tight text-slate-500">
                  다 한 일이 아직 없어요
                </p>
              )}
            </div>
          ) : (
            <div className="w-full flex-col overflow-hidden">
              {getFilteredTodos().map((todo) => (
                <TodoItem key={todo.id} todo={todo} showGoals showIcons />
              ))}
            </div>
          )}
        </div>
      </div>

      {isTodoCreateModalVisible && (
        <TodoCreateModal onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default TodosPage;
