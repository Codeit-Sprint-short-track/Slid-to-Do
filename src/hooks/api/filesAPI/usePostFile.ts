import postFile from '@/api/filesAPI';
import { showToast } from '@components/Toast';
import { useMutation } from '@tanstack/react-query';

function usePostFile(handleSuccess?: () => void) {
  return useMutation({
    mutationFn: async (file: File) => {
      return postFile(file);
    },
    onSuccess: () => {
      showToast('파일 업로드 완료');
      if (handleSuccess) handleSuccess();
    },
  });
}

export default usePostFile;
