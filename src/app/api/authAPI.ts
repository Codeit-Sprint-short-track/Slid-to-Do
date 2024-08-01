import authInstance from './authInstance';

interface LoginData {
  email: string;
  password: string;
}

const login = async (loginData: LoginData) => {
  const res = await authInstance({
    url: '/auth/login',
    method: 'post',
    data: loginData,
  });
  return res;
};

const getTokens = async (refreshToken: string) => {
  const res = await authInstance({
    url: '/auth/tokens',
    method: 'post',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return res;
};

export default { login, getTokens };
