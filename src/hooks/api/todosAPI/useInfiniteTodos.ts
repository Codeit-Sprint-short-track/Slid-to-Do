import todosAPI from '@/api/todosAPI';
import {
  QueryFunctionContext,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

// queryKey로 [‘todos’, 의존성] 넘겨주세요

const useInfiniteTodos = (
  queryKey: QueryFunctionContext['queryKey'],
  goalId?: number,
  done?: boolean,
  size = 20,
) =>
  useSuspenseInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await todosAPI.getTodos(goalId, done, pageParam, size);
      return response;
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

export default useInfiniteTodos;
