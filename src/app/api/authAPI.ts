import axios from 'axios';

interface LoginData {
  email: string;
  password: string;
}
const login = async (loginData: LoginData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    loginData,
  );
  return res;
};

const getTokens = async (refreshToken: string) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/auth/tokens`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
  return res;
};

export default { login, getTokens };
