import { Todo } from '@/types/interface';
import { renderHook } from '@testing-library/react';
import { act, ChangeEvent } from 'react';
import useTodoDetail from './useTodoDetail';

describe('TodoDetailModal hooks and functions', () => {
  const sampleTodo: Todo = {
    id: 1,
    title: 'Initial Title',
    goal: { id: 1, title: 'Initial Goal' },
    fileUrl: 'https://example.com/file.png',
    linkUrl: 'https://example.com',
    noteId: null,
    done: false,
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  test('handleTitleChange updates the title state', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    const event = {
      target: { value: 'New Title' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.setTitle(event.target.value);
    });

    expect(result.current.title).toBe('New Title');
  });

  test('handleFileDelete resets the fileUrl and input field', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    act(() => {
      result.current.setFileUrl(null);
    });

    expect(result.current.fileUrl).toBeNull();
  });

  test('toggleDone toggles the done state', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    act(() => {
      result.current.setDone(!result.current.done);
    });

    expect(result.current.done).toBe(true);

    act(() => {
      result.current.setDone(!result.current.done);
    });

    expect(result.current.done).toBe(false);
  });

  test('handleSave updates the todo correctly', () => {
    const { result } = renderHook(() => useTodoDetail(sampleTodo));

    act(() => {
      result.current.setTitle('Updated Title');
      result.current.setGoal({ id: 2, title: 'Updated Goal' });
      result.current.setFileUrl('https://new-file.com/file.png');
      result.current.setLinkUrl('https://new-link.com');
      result.current.setDone(true);
    });

    const updatedTodo = {
      title:
        result.current.title !== sampleTodo.title
          ? result.current.title
          : undefined,
      goalId:
        result.current.goal?.id !== sampleTodo.goal?.id
          ? result.current.goal?.id
          : undefined,
      fileUrl:
        result.current.fileUrl !== sampleTodo.fileUrl
          ? result.current.fileUrl
          : undefined,
      linkUrl:
        result.current.linkUrl !== sampleTodo.linkUrl
          ? result.current.linkUrl
          : undefined,
      done:
        result.current.done !== sampleTodo.done
          ? result.current.done
          : undefined,
    };

    expect(updatedTodo.title).toBe('Updated Title');
    expect(updatedTodo.goalId).toBe(2);
    expect(updatedTodo.fileUrl).toBe('https://new-file.com/file.png');
    expect(updatedTodo.linkUrl).toBe('https://new-link.com');
    expect(updatedTodo.done).toBe(true);
  });
});
