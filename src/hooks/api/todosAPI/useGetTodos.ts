import todosAPI from '@/api/todosAPI';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useGetTodos = (goalId?: number, done?: boolean, size = 20) =>
  useSuspenseInfiniteQuery({
    queryKey: ['todos', goalId, done, size],
    queryFn: async ({ pageParam = 0 }) =>
      todosAPI.getTodos(goalId, done, pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

export default useGetTodos;
