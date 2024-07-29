import goalsAPI from '@/api/goalsAPI';
import {
  QueryFunctionContext,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

// queryKey로 [‘goals’, 의존성] 넘겨주세요

const useGetGoals = (queryKey: QueryFunctionContext['queryKey'], size = 20) =>
  useSuspenseInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await goalsAPI.getGoals(pageParam, size);
      return response;
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

export default useGetGoals;
