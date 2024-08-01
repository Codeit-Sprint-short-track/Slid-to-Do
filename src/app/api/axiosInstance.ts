import axios, {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// ts-ignore
const mockResponse: AxiosResponse = {
  data: { message: 'NoLocalToken' },
  status: 401,
  statusText: 'Unauthorized',
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  } as InternalAxiosRequestConfig,
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const token = localStorage.getItem('accessToken');
    if (token) {
      newConfig.headers = newConfig.headers || {};
      (newConfig.headers as AxiosRequestHeaders).Authorization =
        `Bearer ${token}`;
    } else {
      const source = axios.CancelToken.source();
      newConfig.cancelToken = source.token;
      source.cancel(
        JSON.stringify({
          response: mockResponse,
        }),
      );
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
