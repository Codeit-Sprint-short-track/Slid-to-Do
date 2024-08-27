import todosAPI from '@/api/todosAPI';
import { useQuery } from '@tanstack/react-query';

const useGetRecentTodos = () =>
  useQuery({
    queryKey: ['recentTodos'],
    queryFn: () => todosAPI.getTodos(undefined, undefined, undefined, 4),
  });

export default useGetRecentTodos;
