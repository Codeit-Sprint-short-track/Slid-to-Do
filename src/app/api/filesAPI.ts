import axiosInstance from './axiosInstance';

export interface UploadResponse {
  url: string;
}

const postFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post<UploadResponse>(
    '/files',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export default postFile;
