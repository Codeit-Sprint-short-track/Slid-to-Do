import todosAPI, { UpdateTodo } from '@/api/todosAPI';
import { showToast } from '@components/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function usePatchTodo(beforeGoalId?: number, afterGoalId?: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ todoId, todo }: { todoId: number; todo: UpdateTodo }) =>
      todosAPI.patchTodo(todoId, todo),
    onSuccess: () => {
      showToast('수정되었습니다');
      queryClient.invalidateQueries({ queryKey: ['recentTodos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', beforeGoalId] });
      queryClient.invalidateQueries({ queryKey: ['todos', afterGoalId] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export default usePatchTodo;
