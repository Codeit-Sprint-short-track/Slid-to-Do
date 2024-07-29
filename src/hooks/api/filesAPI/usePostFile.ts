import { useMutation } from '@tanstack/react-query';
// import { showErrorToast, showToast } from '@components/Toast';
import postFile from '@/api/filesAPI';

function usePostFile(handleSuccess?: () => void) {
  return useMutation({
    mutationFn: async (file: File) => {
      return postFile(file);
    },
    onSuccess: () => {
      // showToast('파일 업로드 성공!');
      if (handleSuccess) handleSuccess();
    },
  });
}

export default usePostFile;
