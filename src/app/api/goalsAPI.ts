import axiosInstance from './axiosInstance';

interface Goal {
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  userId: number;
  teamId: string;
}

interface GetGoalsResponse {
  nextCursor: number | null;
  totalCount: number;
  goals: Goal[];
}

const getGoals = async (
  cursor?: number,
  size = 20,
): Promise<GetGoalsResponse> => {
  const response = await axiosInstance.get<GetGoalsResponse>('/goals', {
    params: { cursor, size },
  });
  return response.data;
};

const postGoal = async (title: string): Promise<Goal> => {
  const response = await axiosInstance.post<Goal>('/goals', {
    title,
  });
  return response.data;
};

const getGoal = async (goalId: number): Promise<Goal> => {
  const response = await axiosInstance.get<Goal>(`/goals/${goalId}`);
  return response.data;
};

const patchGoal = async (goalId: number, title: string): Promise<Goal> => {
  const response = await axiosInstance.patch<Goal>(`/goals/${goalId}`, {
    title,
  });
  return response.data;
};

const deleteGoal = async (goalId: number): Promise<void> => {
  await axiosInstance.delete(`/goals/${goalId}`);
};

export default { getGoals, postGoal, getGoal, patchGoal, deleteGoal };
