import { Note, Todo } from '@/types/interface';
import { PlusBlueIcon } from '@assets';
import TodoList from '@components/TodoList';
import useWindowHeight from '@hooks/useWindowHeight';
import useWindowWidth from '@hooks/useWindowWidth';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterButtons from './components/FilterButtons';
import mockNotes from './mockNotes';
import mockTodos from './mockTodos';

function TodosPage() {
  const windowHeight = useWindowHeight();
  const windowWidth = useWindowWidth();

  const mobileHeight = windowHeight - 88;
  const defaultHeight = windowHeight - 196;
  const tabletHeight = windowHeight - 184;

  const containerClass = classNames('w-full overflow-auto rounded-xl', {
    'tablet:h-dvh': windowWidth >= 744,
  });

  const style =
    windowWidth >= 744
      ? { height: `${tabletHeight}px` }
      : { height: `${defaultHeight}px` };

  const entireContainerClass = classNames(
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

  //   const handleCloseModal = () => {
  //     setIsTodoCreateModalVisible(false);
  //   };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Todo' | 'Done'>('All');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isTodoDetailModalVisible, setTodoDetailModalVisible] =
    useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // GET
    setTodos(mockTodos);
    setFilteredTodos(mockTodos);
  }, []);

  const applyFilter = (
    selectedFilter: 'All' | 'Todo' | 'Done',
    todosToFilter = todos,
  ) => {
    setFilter(selectedFilter);
    switch (selectedFilter) {
      case 'All':
        setFilteredTodos(todosToFilter);
        break;
      case 'Todo':
        setFilteredTodos(todosToFilter.filter((todo) => !todo.done));
        break;
      case 'Done':
        setFilteredTodos(todosToFilter.filter((todo) => todo.done));
        break;
      default:
        setFilteredTodos(todosToFilter);
    }
  };

  const handleToggleDone = async (id: number) => {
    // 낙관적 업데이트
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );

    setTodos(newTodos);

    const newFilteredTodos = newTodos.filter((todo) => {
      if (filter === 'All') return true;
      if (filter === 'Todo') return !todo.done;
      if (filter === 'Done') return todo.done;
      return true;
    });

    setFilteredTodos(newFilteredTodos);

    // PATCH

    applyFilter(filter, newTodos);
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setTodoDetailModalVisible(true);
  };

  //   const handleCloseTodoDetail = () => {
  //     setTodoDetailModalVisible(false);
  //     setSelectedTodo(null);
  //   };

  const handleOpenNoteDetail = async (id: number) => {
    // GET
    setNotes(mockNotes);
    const note = notes.find((n) => n.todo.id === id);
    return note;
  };

  const navigate = useNavigate();

  const handleOpenNoteWrite = (id: number) => {
    // 노트 작성 페이지로 이동
    navigate('/notes'); // 임시
    return id;
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
      <div className="box-border flex h-full w-full flex-grow flex-col items-start justify-start gap-4 self-stretch rounded-xl border border-slate-100 bg-white p-6">
        <div className="inline-flex h-full w-full flex-col items-start justify-start gap-4">
          <FilterButtons selectedFilter={filter} onFilterChange={applyFilter} />
          <div className={containerClass} style={style}>
            <TodoList
              todos={filteredTodos}
              onToggleDone={handleToggleDone}
              showGoals
              showIcons
              onTodoClick={handleTodoClick}
              onOpenNoteDetail={handleOpenNoteDetail}
              onOpenNoteWrite={handleOpenNoteWrite}
            />
          </div>
        </div>
      </div>
      {isTodoCreateModalVisible && (
        // <TodoCreateModal onClose={handleCloseModal} />
        <div>TodoCreateModal</div>
      )}
      {isTodoDetailModalVisible && selectedTodo && (
        // <TodoDetailModal todo={selectedTodo} onClose={handleCloseTodoDetail} />
        <div>TodoDetailModal</div>
      )}
    </div>
  );
}

export default TodosPage;
