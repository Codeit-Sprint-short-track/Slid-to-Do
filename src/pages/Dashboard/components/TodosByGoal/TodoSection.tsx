import { Todo } from '@/types/interface';
import TodoItem from '@components/TodoItem';

interface TodoSectionProps {
  title: string;
  placeholder: string;
  todos: Todo[] | null;
}

function TodoSection({ title, placeholder, todos }: TodoSectionProps) {
  return (
    <div className="tablet:min-w-0 tablet:flex-1">
      <div className="font-semibold">{title}</div>
      <div className="mt-3">
        {todos && todos.length > 0 ? (
          <div className="w-full flex-col overflow-hidden">
            {todos.map((todo) => (
              <TodoItem todo={todo} showIcons />
            ))}
          </div>
        ) : (
          <div className="flex h-[120px] items-center justify-center">
            <p className="text-sm font-normal text-slate-500">{placeholder}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoSection;
