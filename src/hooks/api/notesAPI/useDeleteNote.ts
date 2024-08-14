import notesAPI from '@app/api/notesAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: number) => notesAPI.deleteNote(noteId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onSuccess: () => {
      showToast('노트가 삭제되었습니다');
    },
  });
};

export default useDeleteNote;
