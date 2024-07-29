import axiosInstance from './axiosInstance';

interface GetNotesResponseNote {
  todo: {
    done: boolean;
    title: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  } | null;
  userId: number;
  teamId: string;
}

interface GetNotesResponse {
  nextCursor: number | null;
  totalCount: number;
  notes: GetNotesResponseNote[];
}

interface Note {
  todo: {
    done: boolean;
    fileUrl: string | null;
    linkUrl: string | null;
    title: string;
    id: number;
  };
  linkUrl: string | null;
  content: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  id: number;
  goal: {
    title: string;
    id: number;
  } | null;
  userId: number;
  teamId: string;
}

interface UpdateNote {
  title?: string;
  content?: string;
  linkUrl?: string | null;
}

const getNotes = async (
  goalId?: number,
  cursor?: number,
  size = 20,
): Promise<GetNotesResponse> => {
  const response = await axiosInstance.get<GetNotesResponse>('/notes', {
    params: { goalId, cursor, size },
  });
  return response.data;
};

const postNote = async (
  todoId: number,
  title: string,
  content: string,
  linkUrl?: string,
): Promise<Note> => {
  const response = await axiosInstance.post<Note>('/notes', {
    todoId,
    title,
    content,
    linkUrl,
  });
  return response.data;
};

const getNote = async (noteId: number): Promise<Note> => {
  const response = await axiosInstance.get<Note>(`/notes/${noteId}`);
  return response.data;
};

const patchNote = async (noteId: number, note: UpdateNote): Promise<Note> => {
  const response = await axiosInstance.patch<Note>(`/notes/${noteId}`, note);
  return response.data;
};

const deleteNote = async (noteId: number): Promise<void> => {
  await axiosInstance.delete(`/notes/${noteId}`);
};

export default { getNotes, postNote, getNote, patchNote, deleteNote };
