import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}
const Login = async (loginData: LoginData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    loginData,
  );
  return res;
};

export default Login;
