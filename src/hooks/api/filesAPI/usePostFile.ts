import postFile, { UploadResponse } from '@/api/filesAPI';
import { showToast } from '@components/Toast';
import { useMutation } from '@tanstack/react-query';

function usePostFile(onSuccess?: (data: UploadResponse) => void) {
  return useMutation({
    mutationFn: async (file: File) => {
      return postFile(file);
    },
    onSuccess: (data) => {
      showToast('파일 업로드 완료');
      if (onSuccess) onSuccess(data);
    },
  });
}

export default usePostFile;
