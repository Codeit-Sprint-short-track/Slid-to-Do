import {
  ActiveBlue,
  FileIcon,
  GoalIcon,
  Inactive,
  LinkIcon,
  NoteViewIcon,
  NoteWriteIcon,
} from '@assets';
import { Link } from 'react-router-dom';

interface Goal {
  id: number;
  title: string;
}

export interface Todo {
  noteId: number;
  done: boolean;
  linkUrl?: string;
  fileUrl?: string;
  title: string;
  id: number;
  goal?: Goal;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface TodoListProps {
  todos: Todo[];
  onToggleDone: (id: number) => void;
  showGoals?: boolean;
  showIcons?: boolean;
  hoverBgColor?: string;
  onTodoClick: (todo: Todo) => void;
  onOpenNoteDetail?: (noteId: number) => void;
  onOpenNoteWrite?: (noteId: number) => void;
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
        <div
          key={todo.id}
          className={`group relative flex cursor-pointer items-center justify-between rounded-lg p-1 transition-all duration-200 ${hoverBgColor}`}
          onClick={() => onTodoClick(todo)}
          role="button"
          tabIndex={0}
          onKeyDown={() => onTodoClick(todo)}
        >
          <div className="flex w-full items-start space-x-2 overflow-hidden">
            <button
              type="button"
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center p-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onToggleDone(todo.id);
              }}
              aria-label={todo.done ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.done ? (
                <ActiveBlue width={24} height={24} />
              ) : (
                <Inactive width={24} height={24} />
              )}
            </button>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div
                className={`pt-0.5 text-sm font-normal text-slate-800 ${todo.done ? 'line-through' : ''} truncate whitespace-nowrap`}
              >
                {todo.title}
              </div>
              {showGoals && todo.goal && (
                <div className="mt-1 flex items-center overflow-hidden">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50">
                    <GoalIcon width={24} height={24} />
                  </div>
                  <div className="ml-2 truncate text-sm font-normal text-slate-700">
                    {todo.goal.title}
                  </div>
                </div>
              )}
            </div>
          </div>
          {showIcons && (
            <div className="flex flex-shrink-0 items-center space-x-2">
              {todo.fileUrl && (
                <Link
                  to={todo.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 tablet:flex"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open file"
                >
                  <FileIcon width={24} height={24} />
                </Link>
              )}
              {todo.linkUrl && (
                <Link
                  to={todo.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 tablet:flex"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open link"
                >
                  <LinkIcon width={24} height={24} />
                </Link>
              )}
              {todo.noteId !== 0 ? (
                <button
                  type="button"
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenNoteDetail) onOpenNoteDetail(todo.noteId);
                  }}
                  aria-label="View note"
                >
                  <NoteViewIcon width={24} height={24} />
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenNoteWrite) onOpenNoteWrite(todo.id);
                  }}
                  aria-label="Write note"
                >
                  <NoteWriteIcon width={24} height={24} />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
