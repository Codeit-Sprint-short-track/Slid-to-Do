import { DeleteIcon } from '@/assets';
import { useState } from 'react';

interface PopupProps {
  message: string;
  singleButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function Popup({
  message,
  singleButton = false,
  onConfirm,
  onCancel,
}: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsVisible(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-[203px] w-[300px] flex-col items-center justify-center gap-2.5 rounded-lg bg-white p-6 tablet:h-[216px] tablet:w-[450px]">
        <div className="flex w-full justify-end">
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={handleCancel}
            aria-label="Close"
          >
            <DeleteIcon width={24} height={24} />
          </button>
        </div>
        <div className="flex w-full flex-grow items-center justify-center">
          <div className="whitespace-pre-wrap text-center text-base font-medium leading-normal text-slate-800">
            {message}
          </div>
        </div>
        <div
          className={`flex ${
            singleButton
              ? 'justify-center tablet:justify-end'
              : 'justify-center gap-2'
          } w-full`}
        >
          {!singleButton && (
            <button
              type="button"
              className="flex h-12 w-[120px] items-center justify-center rounded-xl border border-blue-500 bg-white text-base font-semibold leading-normal text-blue-500"
              onClick={handleCancel}
              aria-label="Cancel"
            >
              취소
            </button>
          )}
          <button
            type="button"
            className="flex h-12 w-[120px] items-center justify-center rounded-xl bg-blue-500 text-base font-semibold leading-normal text-white"
            onClick={handleConfirm}
            aria-label="Confirm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
