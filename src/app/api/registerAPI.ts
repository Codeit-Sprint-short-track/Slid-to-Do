import axios from 'axios';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}
const Register = async (registerData: RegisterData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user`,
    registerData,
  );
  return response;
};

export default Register;
