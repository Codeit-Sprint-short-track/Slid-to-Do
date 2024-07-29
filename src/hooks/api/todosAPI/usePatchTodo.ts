import todosAPI, { UpdateTodo } from '@/api/todosAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function usePatchTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      todoId,
      todo,
    }: {
      todoId: number;
      todo: UpdateTodo;
    }) => {
      return todosAPI.patchTodo(todoId, todo);
    },
    onSuccess: () => {
      showToast('할 일 수정 완료');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export default usePatchTodo;
