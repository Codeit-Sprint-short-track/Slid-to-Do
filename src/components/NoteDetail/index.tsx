/* eslint-disable */
import { DeleteIcon, FlagIcon, GrayDelete } from '@assets';
import Kebab from '@components/Kebab';
import useDeleteNote from '@hooks/api/notesAPI/useDeleteNote';
import useGetNote from '@hooks/api/notesAPI/useGetNote';
import formatDate from '@utils/formatDate';

import { useEffect, useState } from 'react';

interface NoteDetailProps {
  onClose: () => void;
  noteId: number;
}

function NoteDetail({ onClose, noteId }: NoteDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: noteData } = useGetNote(noteId);
  const { mutate } = useDeleteNote();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // 애니메이션이 끝난 후 onClose 호출
  };

  const handleEditNote = () => {
    // 노트 수정 페이지로 이동
  };

  const handleDeleteNote = () => {
    mutate(noteId);
  };

  return (
    <>
      {isOpen && (
        <div
          className="absolute left-0 top-0 z-20 h-dvh w-dvw opacity-50 tablet:bg-black"
          onClick={handleClose}
        />
      )}
      {noteData && (
        <div
          className={`fixed right-0 top-0 z-30 h-screen bg-white p-6 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} tablet:w-[512px] desktop:w-[800px]`}
        >
          <DeleteIcon className="mb-4 cursor-pointer" onClick={handleClose} />
          <div className="flex flex-col gap-3 border-b-[1px] border-slate-200 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-[6px]">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800">
                  <FlagIcon className="h-[14.4px] w-[14.4px] fill-white" />
                </div>
                <h3 className="font-medium leading-6 text-slate-800">
                  {noteData.data.goal.title}
                </h3>
              </div>
              <Kebab
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                isSmall
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
                  <span className="text-xs font-medium leading-4 text-slate-700">
                    {noteData.data.todo.done ? 'Done' : 'To do'}
                  </span>
                </div>
                <p className="text-sm leading-5 text-slate-700">
                  {noteData.data.todo.title}
                </p>
              </div>
              <p className="text-xs leading-4 text-slate-500">
                {formatDate(noteData.data.createdAt)} 작성
                {noteData.data.createdAt !== noteData.data.updatedAt
                  ? ` | ${formatDate(noteData.data.updatedAt)} 수정`
                  : ''}
              </p>
            </div>
          </div>
          <div className="border-b-[1px] border-slate-200 py-3">
            <h2 className="text-lg font-medium leading-7 text-slate-800">
              {noteData.data.title}
            </h2>
          </div>
          <div
            className={`leading-6 text-slate-700 ${noteData.data.linkUrl ? 'pt-3' : 'pt-4'}`}
          >
            {noteData.data.linkUrl ? (
              <div className="mb-4 flex justify-between rounded-[20px] bg-slate-200 py-1 pl-4 pr-[6px]">
                {noteData.data.linkUrl}
                <GrayDelete className="cursor-pointer" />
              </div>
            ) : (
              <div className="pt-1" />
            )}
            {noteData.data.content}
          </div>
        </div>
      )}
    </>
  );
}

export default NoteDetail;
