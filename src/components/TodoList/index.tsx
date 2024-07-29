import { Todo } from '@/types/interface';
import TodoItem from './TodoItem';

export interface TodoListProps {
  todos: Todo[];
  onToggleDone: (id: number) => void;
  showGoals?: boolean;
  showIcons?: boolean;
  hoverBgColor?: string;
  onTodoClick: (todo: Todo) => void;
  onOpenNoteDetail?: (id: number | null) => void;
  onOpenNoteWrite?: (todo: Todo) => void;
}

function TodoList({
  todos,
  onToggleDone,
  showGoals = false,
  showIcons = false,
  hoverBgColor = 'hover:bg-slate-100',
  onTodoClick,
  onOpenNoteDetail,
  onOpenNoteWrite,
}: TodoListProps) {
  return (
    <div className="w-full flex-col overflow-hidden">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={onToggleDone}
          showGoals={showGoals}
          showIcons={showIcons}
          hoverBgColor={hoverBgColor}
          onTodoClick={onTodoClick}
          onOpenNoteDetail={onOpenNoteDetail}
          onOpenNoteWrite={onOpenNoteWrite}
        />
      ))}
    </div>
  );
}

export default TodoList;
