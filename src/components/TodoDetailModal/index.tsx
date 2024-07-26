/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable complexity */

import { Goal, Todo } from '@/types/interface';
import {
  ActiveBlue,
  ActiveWhite,
  DeleteIcon,
  GrayDelete,
  Inactive,
} from '@assets';
import BaseInput from '@components/Input/BaseInput';
import LinkModal from '@components/LinkModal';
import Popup from '@components/Popup';
import { ChangeEvent, useEffect, useState } from 'react';

const mockGoals: Goal[] = [
  {
    id: 1,
    title: 'Goal 1',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Goal 2',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 3,
    title: 'Goal 3',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 4,
    title: 'Goal 4',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 5,
    title: 'Goal 5',
    userId: 1,
    teamId: 'team1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

export interface TodoDetailModalProps {
  todo: Todo;
  onClose: () => void;
}

function TodoDetailModal({ todo, onClose }: TodoDetailModalProps) {
  const [done, setDone] = useState(todo.done);
  const [title, setTitle] = useState(todo.title);
  const [goal, setGoal] = useState(todo.goal);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [fileUrl, setFileUrl] = useState(todo.fileUrl);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState(todo.linkUrl);
  const [isModified, setIsModified] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isUnsavedChangesPopupVisible, setIsUnsavedChangesPopupVisible] =
    useState(false);

  useEffect(() => {
    // GET
    setGoals(mockGoals);
  }, []);

  useEffect(() => {
    const isTitleChanged = title !== todo.title;
    const isGoalChanged = goal?.id !== todo.goal?.id;
    const isFileUrlChanged = fileUrl !== todo.fileUrl;
    const isLinkUrlChanged = linkUrl !== todo.linkUrl;
    const isDoneChanged = done !== todo.done;

    setIsModified(
      isTitleChanged ||
        isGoalChanged ||
        isFileUrlChanged ||
        isLinkUrlChanged ||
        isDoneChanged,
    );
  }, [title, goal, fileUrl, linkUrl, done, todo]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGoalChange = (selectedGoal: Goal | null) => {
    setGoal(selectedGoal);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // POST
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileType(file.type);
      setFileName(file.name);
    }
  };

  const handleLinkChange = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleFileDelete = () => {
    setFileUrl(null);
    setFileType(null);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLinkDelete = () => {
    setLinkUrl(null);
  };

  const handleSave = () => {
    // PATCH
    onClose();
  };

  const handleDelete = () => {
    // DELETE
    onClose();
  };

  const toggleDone = () => {
    setDone(!done);
  };

  const handleConfirmClose = () => {
    if (isModified) {
      setIsUnsavedChangesPopupVisible(true);
    } else {
      onClose();
    }
  };

  const isTitleValid = title.length <= 30;
  const canSave = isModified && isTitleValid && title.length > 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative flex h-full w-full flex-col gap-2.5 bg-white p-6 tablet:h-auto tablet:w-[520px] tablet:overflow-visible tablet:rounded-xl">
          {/* 상단 고정 영역 */}
          <div className="fixed left-0 right-0 top-0 z-10 flex w-full items-center justify-between bg-white p-6 tablet:static tablet:p-0">
            <div className="text-lg font-bold leading-7 text-slate-800">
              할 일
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center justify-center"
                onClick={handleConfirmClose}
                aria-label="Close"
              >
                <DeleteIcon width={24} height={24} />
              </button>
            </div>
          </div>

          {/* 가운데 스크롤 가능한 영역 */}
          <div className="mt-6 flex grow flex-col items-center justify-start overflow-auto pb-20 pt-6 tablet:mt-0 tablet:justify-between tablet:overflow-visible tablet:pb-0 tablet:pt-0">
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <div className="flex items-start justify-start gap-0.5">
                <div className="flex h-6 grow items-start justify-start gap-0.5">
                  <div
                    className="flex h-6 w-6 items-center justify-center p-[3px]"
                    onClick={toggleDone}
                  >
                    {done ? (
                      <ActiveBlue width={24} height={24} />
                    ) : (
                      <Inactive width={24} height={24} />
                    )}
                  </div>
                  <div className="text-base font-semibold leading-normal text-slate-600">
                    {done ? 'Done' : 'Todo'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start justify-start gap-6 self-stretch">
              <div className="flex flex-col items-start justify-start self-stretch">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold leading-normal text-slate-800">
                    제목
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-start justify-start self-stretch rounded-xl">
                  <BaseInput
                    size="lg"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력해주세요."
                    isInvalid={!isTitleValid}
                  />
                  {!isTitleValid && (
                    <div className="mt-1.5 items-start justify-start pl-2 text-sm font-normal leading-tight text-red-500">
                      제목은 30자를 넘을 수 없습니다. (현재 {title.length}자)
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start justify-start gap-3 self-stretch">
                <div className="text-base font-semibold leading-normal text-slate-800">
                  목표
                </div>
                <div className="flex h-12 w-full items-center justify-center self-stretch rounded-xl bg-slate-50 px-5 py-3">
                  <div className="flex h-6 w-full items-center justify-center self-stretch">
                    <select
                      className="w-full self-stretch bg-slate-50"
                      value={goal ? goal.id : ''}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue === '') {
                          handleGoalChange(null);
                        } else {
                          const selectedGoal = goals.find(
                            (g) => g.id === Number(selectedValue),
                          );
                          if (selectedGoal !== undefined) {
                            handleGoalChange(selectedGoal);
                          } else {
                            handleGoalChange(null);
                          }
                        }
                      }}
                    >
                      <option value="">목표를 선택해주세요 (선택 안함)</option>
                      {goals.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-start gap-3 self-stretch">
                <div className="text-base font-semibold leading-normal text-slate-800">
                  파일 및 링크
                </div>
                <div className="flex items-start justify-start gap-3">
                  <div
                    className={`flex cursor-pointer flex-col items-start justify-start gap-2.5 rounded-lg border ${
                      fileUrl ? 'bg-slate-900' : 'bg-slate-100'
                    } w-1/2 py-2 pl-2 pr-3`}
                    onClick={
                      !fileUrl
                        ? () => document.getElementById('fileInput')?.click()
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-center gap-0.5">
                      <div className="relative h-6 w-6 pt-[3px]">
                        {fileUrl ? (
                          <ActiveWhite width={18} height={18} />
                        ) : (
                          <Inactive width={18} height={18} />
                        )}
                      </div>
                      <div
                        className={`text-base font-medium leading-normal ${
                          fileUrl ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        파일 첨부
                      </div>
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div
                    className={`flex cursor-pointer flex-col items-start justify-start gap-2.5 rounded-lg border ${
                      linkUrl ? 'bg-slate-900' : 'bg-slate-100'
                    } w-1/2 py-2 pl-2 pr-3`}
                    onClick={
                      !linkUrl ? () => setIsLinkModalVisible(true) : undefined
                    }
                  >
                    <div className="flex items-center justify-center gap-0.5">
                      <div className="relative h-6 w-6 pt-[3px]">
                        {linkUrl ? (
                          <ActiveWhite width={18} height={18} />
                        ) : (
                          <Inactive width={18} height={18} />
                        )}
                      </div>
                      <div
                        className={`text-base font-medium leading-normal ${
                          linkUrl ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        링크 첨부
                      </div>
                    </div>
                  </div>
                </div>
                {fileUrl !== null && fileType && (
                  <div className="relative mx-auto mt-2 flex h-[184px] w-full items-center justify-center rounded-[20px] bg-slate-200 p-6">
                    {(() => {
                      if (fileType === 'application/pdf') {
                        return (
                          <embed
                            src={fileUrl}
                            type="application/pdf"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              borderRadius: '20px',
                              objectFit: 'contain',
                            }}
                            aria-label="PDF Document"
                          />
                        );
                      }

                      if (fileType.startsWith('image/')) {
                        return (
                          <img
                            src={fileUrl}
                            alt="첨부파일"
                            className="max-h-full max-w-full rounded-[20px] object-contain"
                          />
                        );
                      }

                      if (
                        fileType === 'video/mp4' ||
                        fileType === 'video/quicktime'
                      ) {
                        return (
                          <video
                            src={fileUrl}
                            controls
                            className="max-h-full max-w-full rounded-[20px] object-contain"
                          >
                            <track kind="captions" />
                          </video>
                        );
                      }

                      return (
                        <div className="max-h-full max-w-full rounded-[20px] text-center text-xs text-slate-400 tablet:text-base">
                          미리보기가 지원되지 않는 파일 형식입니다.
                          <br />
                          {fileName}
                        </div>
                      );
                    })()}

                    <button
                      type="button"
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-slate-200"
                      onClick={handleFileDelete}
                    >
                      <GrayDelete width={18} height={18} />
                    </button>
                  </div>
                )}
                {linkUrl && (
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex h-8 w-1/2 flex-col items-start justify-start gap-2.5 rounded-[20px] bg-slate-200 py-1 pl-4 pr-1.5"
                  >
                    <div className="inline-flex items-start justify-between self-stretch">
                      <div className="flex w-[90%] items-start justify-start gap-2 truncate">
                        <div className="truncate font-['Pretendard'] text-base font-normal leading-normal text-slate-800">
                          {linkUrl}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative h-6 w-6"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkDelete();
                        }}
                      >
                        <GrayDelete width={18} height={18} />
                      </button>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 하단 고정 영역 */}
          <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-center gap-x-2 bg-white px-6 py-3 tablet:static tablet:mt-8 tablet:p-0">
            <button
              type="button"
              className="flex-grow rounded-xl border border-blue-500 bg-white px-6 py-3 text-base font-semibold leading-normal text-blue-500"
              onClick={() => setIsDeletePopupVisible(true)}
            >
              삭제
            </button>
            <button
              type="button"
              className={`flex-grow rounded-xl px-6 py-3 text-base font-semibold leading-normal text-white ${
                canSave ? 'bg-blue-500' : 'bg-slate-400'
              }`}
              disabled={!canSave}
              onClick={handleSave}
            >
              수정
            </button>
          </div>
        </div>
      </div>
      {isLinkModalVisible && (
        <LinkModal
          onCancel={() => setIsLinkModalVisible(false)}
          onConfirm={(link: string) => {
            handleLinkChange(link);
            setIsLinkModalVisible(false);
          }}
        />
      )}
      {isDeletePopupVisible && (
        <Popup
          message="삭제하시겠습니까?"
          confirmMessage="삭제"
          onConfirm={handleDelete}
          onCancel={() => setIsDeletePopupVisible(false)}
        />
      )}
      {isUnsavedChangesPopupVisible && (
        <Popup
          message={`정말 나가시겠어요?\n변경사항이 저장되지 않습니다.`}
          confirmMessage="저장안함"
          onConfirm={onClose}
          onCancel={() => setIsUnsavedChangesPopupVisible(false)}
        />
      )}
    </>
  );
}

export default TodoDetailModal;
