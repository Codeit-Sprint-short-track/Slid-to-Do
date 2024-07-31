import Register from '@app/api/registerAPI';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

function useRegister(
  onSuccess: (res: AxiosResponse) => void,
  onError: (err: Error) => void,
) {
  return useMutation({
    mutationFn: (registerData: RegisterData) => Register(registerData),
    onSuccess: (res) => onSuccess(res),
    onError: (err) => onError(err),
  });
}

export default useRegister;
