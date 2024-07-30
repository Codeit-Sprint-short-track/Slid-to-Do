import notesAPI from '@/api/notesAPI';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetNotes = (goalId?: number, size = 20) =>
  useInfiniteQuery({
    queryKey: ['notes', goalId, size],
    queryFn: async ({ pageParam = 0 }) =>
      notesAPI.getNotes(goalId, pageParam, size),
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

export default useGetNotes;
