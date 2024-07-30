import todosAPI from '@/api/todosAPI';
import { useQuery } from '@tanstack/react-query';

const useGetProgress = (goalId?: number) =>
  useQuery({
    queryKey: ['todos', goalId],
    queryFn: async () => todosAPI.getProgress(goalId),
  });

export default useGetProgress;
