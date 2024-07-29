import todosAPI from '@/api/todosAPI';
import { QueryFunctionContext, useSuspenseQuery } from '@tanstack/react-query';

// queryKey로 ['todos', 의존성] 넘겨주세요

const useGetTodos = (
  queryKey: QueryFunctionContext['queryKey'],
  goalId?: number,
  done?: boolean,
  size = 20,
) =>
  useSuspenseQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await todosAPI.getTodos(goalId, done, 0, size);
      return response;
    },
  });

export default useGetTodos;
