/* eslint-disable */

import { showErrorToast } from '@components/Toast';
import { isAxiosError } from 'axios';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function handleFallbackError({ error }: FallbackProps) {
  return (
    <div
      role="alert"
      className="mt-10 flex flex-col items-center justify-center text-2xl"
    >
      <p>{'오류가 발생했습니다. :('}</p>
      <button
        type="button"
        onClick={() => location.reload()}
        className="underline"
      >
        돌아가기
      </button>
    </div>
  );
}

function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  const onErrorHandler = (error: Error) => {
    console.log(error);
    if (isAxiosError(error)) {
      if (
        error.code === 'ERR_CANCELED' ||
        error.response?.data.message === 'Unauthorized'
      ) {
        // location.href = '/sign-in';
        showErrorToast('로그인이 필요합니다.');
        return;
      }
      if (error.code === 'ERR_BAD_RESPONSE') {
        console.log('서버에러가 발생');
        showErrorToast('서버 에러가 발생했습니다.');
        return;
      }
    }

    showErrorToast('알 수 없는 에러가 발생했습니다.');
    return;
  };
  return (
    <ErrorBoundary
      FallbackComponent={handleFallbackError}
      onError={onErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
