import notesAPI from '@/api/notesAPI';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useGetNotes = (goalId?: number, size = 20) =>
  useSuspenseInfiniteQuery({
    queryKey: ['notes', goalId, size],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await notesAPI.getNotes(goalId, pageParam, size);
      return response;
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor !== null ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
  });

export default useGetNotes;
