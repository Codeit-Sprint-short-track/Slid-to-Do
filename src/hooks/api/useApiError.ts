import { showErrorToast } from '@components/Toast';
import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
  message: string;
}

const useApiError = () => {
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: AxiosError) => {
      if (axios.isAxiosError(error) && error.response) {
        const httpStatus = error.response.status;
        const { message } = error.response.data as ErrorResponse;

        if (message) {
          if (message === 'Unauthorized') {
            navigate('/login');
          } else {
            showErrorToast(message);
          }
          return;
        }

        if (httpStatus >= 500) {
          showErrorToast('서버 에러가 발생했습니다.');
          return;
        }
      }

      showErrorToast('알 수 없는 에러가 발생했습니다.');
    },
    [navigate],
  );

  return { handleError };
};

export default useApiError;
