import axiosInstance from './axiosInstance';

export interface Todo {
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  fileUrl: string | null;
  title: string;
  id: number;
  goal: {
    id: number;
    title: string;
  } | null;
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateTodo {
  title: string;
  fileUrl?: string;
  linkUrl?: string;
  goalId?: number;
}

export interface UpdateTodo {
  title?: string;
  fileUrl?: string | null;
  linkUrl?: string | null;
  goalId?: number | null;
  done?: boolean;
}

interface GetTodosResponse {
  totalCount: number;
  nextCursor: number | null;
  todos: Todo[];
}

interface GetTodosProgressResponse {
  progress: number;
}

const getTodos = async (
  goalId?: number,
  done?: boolean,
  cursor?: number,
  size = 20,
): Promise<GetTodosResponse> => {
  const response = await axiosInstance.get<GetTodosResponse>('/todos', {
    params: { goalId, done, cursor, size },
  });
  return response.data;
};

const postTodo = async (todo: CreateTodo): Promise<Todo> => {
  const response = await axiosInstance.post<Todo>('/todos', todo);
  return response.data;
};

const patchTodo = async (todoId: number, todo: UpdateTodo): Promise<Todo> => {
  const response = await axiosInstance.patch<Todo>(`/todos/${todoId}`, todo);
  return response.data;
};

const deleteTodo = async (todoId: number): Promise<void> => {
  await axiosInstance.delete(`/todos/${todoId}`);
};

const getProgress = async (
  goalId?: number,
): Promise<GetTodosProgressResponse> => {
  const response = await axiosInstance.get<GetTodosProgressResponse>(
    '/todos/progress',
    {
      params: { goalId },
    },
  );
  return response.data;
};

export default {
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo,
  getProgress,
};
