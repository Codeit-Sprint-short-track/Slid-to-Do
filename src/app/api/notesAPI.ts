import axiosInstance from './axiosInstance';

export interface UpdateNote {
  title?: string;
  content?: string;
  linkUrl?: string | null;
}

const getNotes = async (goalId?: number, cursor?: number, size = 20) =>
  axiosInstance({
    url: '/notes',
    method: 'get',
    params: { goalId, cursor, size },
  });

const postNote = async (
  todoId: number,
  title: string,
  content: string,
  linkUrl?: string,
) =>
  axiosInstance({
    url: '/notes',
    method: 'post',
    data: { todoId, title, content, linkUrl },
  });

const getNote = async (noteId: number) =>
  axiosInstance({
    url: `/notes/${noteId}`,
    method: 'get',
  });

const patchNote = async (noteId: number, note: UpdateNote) =>
  axiosInstance({
    url: `/notes/${noteId}`,
    method: 'patch',
    data: note,
  });

const deleteNote = async (noteId: number) =>
  axiosInstance({
    url: `/notes/${noteId}`,
    method: 'delete',
  });

export default { getNotes, postNote, getNote, patchNote, deleteNote };
