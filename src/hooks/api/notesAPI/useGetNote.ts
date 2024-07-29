import notesAPI from '@/api/notesAPI';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetNote = (noteId: number) =>
  useSuspenseQuery({
    queryKey: ['note', noteId],
    queryFn: async () => {
      const response = await notesAPI.getNote(noteId);
      return response;
    },
  });

export default useGetNote;
