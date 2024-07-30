import axiosInstance from './axiosInstance';

const getGoals = async (cursor?: number, size = 20) =>
  axiosInstance({
    url: '/goals',
    method: 'get',
    params: { cursor, size },
  });

const postGoal = async (title: string) =>
  axiosInstance({
    url: '/goals',
    method: 'post',
    data: { title },
  });

const getGoal = async (goalId: number) =>
  axiosInstance({
    url: `/goals/${goalId}`,
    method: 'get',
  });

const patchGoal = async (goalId: number, title: string) =>
  axiosInstance({
    url: `/goals/${goalId}`,
    method: 'patch',
    data: { title },
  });

const deleteGoal = async (goalId: number) =>
  axiosInstance({
    url: `/goals/${goalId}`,
    method: 'delete',
  });

export default { getGoals, postGoal, getGoal, patchGoal, deleteGoal };
