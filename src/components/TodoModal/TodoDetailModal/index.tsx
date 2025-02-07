import { Goal, Todo } from '@/types/interface';
import { DeleteIcon } from '@assets';
import Button from '@components/Button';
import CreateGoalModal from '@components/CreateGoalModal';
import LinkModal from '@components/LinkModal';
import Popup from '@components/Popup';
import { showErrorToast } from '@components/Toast';
import usePostFile from '@hooks/api/filesAPI/usePostFile';
import useDeleteTodo from '@hooks/api/todosAPI/useDeleteTodo';
import usePatchTodo from '@hooks/api/todosAPI/usePatchTodo';
import useOutsideClick from '@hooks/useOutsideClick';
import useVisibility from '@hooks/useVisibility';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useRef, useState } from 'react';
import FileLinkSection from '../FileLinkSection';
import GoalSection from '../GoalSection';
import TitleSection from '../TitleSection';
import StatusSection from './StatusSection';
import useTodoDetail from './useTodoDetail';

export interface TodoDetailModalProps {
  todo: Todo;
  onClose: () => void;
}

function TodoDetailModal({ todo, onClose }: TodoDetailModalProps) {
  const { isVisible: isOpen, handleClose } = useVisibility(onClose);
  const {
    done,
    title,
    goal,
    fileUrl,
    linkUrl,
    isModified,
    setDone,
    setTitle,
    setGoal,
    setFileUrl,
    setLinkUrl,
  } = useTodoDetail(todo);

  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isUnsavedChangesPopupVisible, setIsUnsavedChangesPopupVisible] =
    useState(false);

  const { mutate: uploadFile } = usePostFile();
  const { mutate: editTodo } = usePatchTodo(todo.goal?.id, goal?.id);
  const { mutate: removeTodo } = useDeleteTodo(todo.goal?.id);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGoalChange = (selectedOption: Goal | null) => {
    if (selectedOption) {
      setGoal(selectedOption);
    } else {
      setGoal(null);
    }
  };

  const handleGoalModalOpen = () => {
    setIsGoalModalVisible(true);
  };

  const handleGoalCreate = (newGoal: Goal) => {
    setGoal(newGoal);
    setIsGoalModalVisible(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      const fileType = uploadedFile.type;
      const validFileTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/quicktime',
      ];

      if (!validFileTypes.includes(fileType)) {
        showErrorToast('이미지, PDF, 영상만 업로드 가능합니다.');
        return;
      }

      uploadFile(uploadedFile, {
        onSuccess: (response: AxiosResponse) => {
          const uploadedFileUrl = response.data.url;
          setFileUrl(uploadedFileUrl);
        },
      });
    }
  };

  const handleLinkModalOpen = () => {
    setIsLinkModalVisible(true);
  };

  const handleLinkChange = (newLink: string) => {
    setLinkUrl(newLink);
  };

  const handleFileDelete = () => {
    setFileUrl(null);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleLinkDelete = () => {
    setLinkUrl(null);
  };

  const handleSave = () => {
    const updatedTodo = {
      ...(title !== todo.title && { title }),
      ...(goal?.id !== todo.goal?.id && { goalId: goal?.id ?? null }),
      ...(fileUrl !== todo.fileUrl && { fileUrl }),
      ...(linkUrl !== todo.linkUrl && { linkUrl }),
      ...(done !== todo.done && { done }),
    };

    if (Object.keys(updatedTodo).length > 0) {
      editTodo({
        todoId: todo.id,
        todo: updatedTodo,
      });
    }

    handleClose();
  };

  const handleDelete = () => {
    removeTodo(todo.id);
    handleClose();
  };

  const toggleDone = () => {
    setDone(!done);
  };

  const handleConfirmClose = () => {
    if (!isOpen) return;

    if (isModified) {
      setIsUnsavedChangesPopupVisible(true);
    } else {
      handleClose();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, () => handleConfirmClose());

  const isTitleValid = title.length <= 30;
  const canSave = isModified && isTitleValid && title.length > 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          ref={modalRef}
          className={`relative flex h-full w-full transform flex-col gap-2.5 bg-white p-6 transition-transform duration-300 tablet:h-auto tablet:w-[520px] tablet:overflow-visible tablet:rounded-xl ${isOpen ? 'translate-y-0' : '-translate-y-10'}`}
        >
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
          <div className="mt-6 flex grow flex-col items-center justify-start gap-y-6 overflow-auto pb-20 pt-6 tablet:mt-0 tablet:justify-between tablet:overflow-visible tablet:pb-0 tablet:pt-0">
            <StatusSection done={done} toggleDone={toggleDone} />
            <TitleSection
              title={title}
              onTitleChange={handleTitleChange}
              isTitleValid={isTitleValid}
            />
            <GoalSection
              goal={goal}
              onGoalChange={handleGoalChange}
              onGoalModalOpen={handleGoalModalOpen}
            />
            <FileLinkSection
              fileUrl={fileUrl}
              linkUrl={linkUrl}
              onFileChange={handleFileChange}
              onFileDelete={handleFileDelete}
              onLinkDelete={handleLinkDelete}
              onLinkModalOpen={handleLinkModalOpen}
            />
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 flex w-full justify-center gap-x-2 bg-white px-6 py-3 tablet:static tablet:mt-8 tablet:p-0">
            <Button
              shape="outlined"
              size="lg"
              onClick={() => setIsDeletePopupVisible(true)}
              additionalClass="flex-grow px-6 py-3 text-base leading-normal"
            >
              삭제
            </Button>
            <Button
              shape="solid"
              size="lg"
              onClick={handleSave}
              additionalClass="flex-grow px-6 py-3 text-base leading-normal"
              disabled={!canSave}
            >
              수정
            </Button>
          </div>
        </div>
      </div>
      {isGoalModalVisible && (
        <CreateGoalModal
          onClose={() => setIsGoalModalVisible(false)}
          onSave={(newGoal: Goal) => {
            handleGoalCreate(newGoal);
            setIsGoalModalVisible(false);
          }}
          fullscreen={false}
        />
      )}
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
          onConfirm={handleClose}
          onCancel={() => setIsUnsavedChangesPopupVisible(false)}
        />
      )}
    </>
  );
}

export default TodoDetailModal;
