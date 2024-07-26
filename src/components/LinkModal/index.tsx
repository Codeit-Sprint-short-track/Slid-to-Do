import { DeleteIcon } from '@assets';
import BaseInput from '@components/Input/BaseInput';
import { VALID_URL_REGEX } from '@constants/regex';
import { ChangeEvent, useEffect, useState } from 'react';

interface LinkModalProps {
  onCancel: () => void;
  onConfirm: (link: string) => void;
  fullscreen?: boolean;
}

function LinkModal({
  onCancel,
  onConfirm,
  fullscreen = false,
}: LinkModalProps) {
  const [link, setLink] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLink(value);
    const isValidLink = VALID_URL_REGEX.test(value);
    setIsValid(isValidLink);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && link.length > 0) {
      onConfirm(link);
    }
  };

  useEffect(() => {
    if (isValid && link.length > 0) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isValid, link.length > 0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`flex h-auto flex-col items-start justify-start gap-2.5 rounded-xl bg-white p-6 ${fullscreen ? 'tablet:w-[520px] tablet:overflow-auto' : 'tablet:w-[450px]'} w-[311px]`}
      >
        <div className="flex flex-col items-start justify-start gap-6 self-stretch">
          <div className="inline-flex w-full items-center justify-between gap-4">
            <div className="text-lg font-bold leading-7 text-slate-800">
              링크 업로드
            </div>
            <div
              className="inline-flex h-6 w-6 cursor-pointer items-center justify-center"
              onClick={onCancel}
            >
              <DeleteIcon />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="mb-3 text-base font-semibold leading-normal text-slate-800">
              링크
            </div>
            <BaseInput
              size="lg"
              value={link}
              onChange={handleLinkChange}
              placeholder="링크를 입력해주세요."
              isInvalid={!isValid}
            />
            {!isValid && (
              <div className="mt-1.5 pl-2 text-sm font-normal leading-tight text-red-500">
                잘못된 링크 주소입니다.
              </div>
            )}
          </div>
        </div>
        <div className="invisible flex-grow">grow</div>
        <div
          className={`inline-flex cursor-pointer items-center justify-center self-stretch rounded-xl py-3 ${
            isValid && link.length > 0 ? 'bg-blue-500' : 'bg-slate-400'
          }`}
          onClick={() => isValid && onConfirm(link)}
        >
          <div className="text-base font-semibold leading-normal text-white">
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkModal;
