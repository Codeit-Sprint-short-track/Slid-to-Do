import axiosInstance from './axiosInstance';

const postFile = async (file: File) =>
  axiosInstance({
    url: '/files',
    method: 'post',
    data: file,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export default postFile;
