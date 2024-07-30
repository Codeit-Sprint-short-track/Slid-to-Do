import todosAPI from '@/api/todosAPI';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetProgress = (goalId?: number) =>
  useSuspenseQuery({
    queryKey: ['todos', goalId],
    queryFn: async () => {
      const response = await todosAPI.getProgress(goalId);
      return response;
    },
  });

export default useGetProgress;
