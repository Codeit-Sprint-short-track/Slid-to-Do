import useDeleteGoal from '@hooks/api/goalsAPI/useDeleteGoal';
import { useState } from 'react';

export default function useModalControl() {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [goalId, setGoalId] = useState<number>(0);
  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const onShowTodoModal = () => setShowTodoModal(true);
  const onShowDeletePopup = (id: number) => {
    setIsDeletePopupVisible(true);
    setGoalId(id);
  };
  const handleDelete = () => {
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        setIsDeletePopupVisible(false);
        setGoalId(0);
      },
    });
  };

  return {
    showTodoModal,
    isDeletePopupVisible,
    onShowTodoModal,
    onShowDeletePopup,
    handleDelete,
    setShowTodoModal,
    setIsDeletePopupVisible,
  };
}
