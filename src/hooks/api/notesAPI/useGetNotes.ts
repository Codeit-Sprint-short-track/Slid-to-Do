import notesAPI from '@/api/notesAPI';
import { QueryFunctionContext, useSuspenseQuery } from '@tanstack/react-query';

// queryKey로 ['notes', 의존성] 넘겨주세요

const useGetNotes = (
  queryKey: QueryFunctionContext['queryKey'],
  goalId?: number,
  cursor?: number,
  size = 20,
) =>
  useSuspenseQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await notesAPI.getNotes(goalId, cursor, size);
      return response;
    },
  });

export default useGetNotes;
