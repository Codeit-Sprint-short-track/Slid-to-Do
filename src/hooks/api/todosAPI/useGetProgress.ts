import todosAPI from '@/api/todosAPI';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetProgress = (goalId?: number) =>
  useSuspenseQuery({
    queryKey: ['todos', goalId],
    queryFn: async () => todosAPI.getProgress(goalId),
  });

export default useGetProgress;
