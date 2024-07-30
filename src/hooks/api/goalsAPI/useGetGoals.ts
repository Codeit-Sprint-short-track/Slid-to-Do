import goalsAPI from '@/api/goalsAPI';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useGetGoals = (size = 20) =>
  useSuspenseInfiniteQuery({
    queryKey: ['goals', size],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await goalsAPI.getGoals(pageParam, size);
      return response;
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

export default useGetGoals;
