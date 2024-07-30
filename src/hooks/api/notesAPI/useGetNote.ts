import notesAPI from '@/api/notesAPI';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetNote = (noteId: number) =>
  useSuspenseQuery({
    queryKey: ['note', noteId],
    queryFn: async () => notesAPI.getNote(noteId),
  });

export default useGetNote;
