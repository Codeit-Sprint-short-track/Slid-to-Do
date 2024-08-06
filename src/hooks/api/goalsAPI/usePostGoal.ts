import goalsAPI from '@app/api/goalsAPI';
import { useMutation } from '@tanstack/react-query';

const usePostGoal = (onSettled: () => void) =>
  useMutation({
    mutationFn: (newGoal: string) => goalsAPI.postGoal(newGoal),
    onSettled: () => onSettled(),
  });

export default usePostGoal;
