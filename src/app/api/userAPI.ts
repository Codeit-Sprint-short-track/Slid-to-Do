import axios from 'axios';
import axiosInstance from './axiosInstance';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}
const register = async (registerData: RegisterData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user`,
    registerData,
  );
  return response;
};

const getUser = async () => {
  const response = await axiosInstance({
    url: '/user',
    method: 'get',
  });
  return response;
};
export default { register, getUser };
