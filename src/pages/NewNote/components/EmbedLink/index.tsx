import { DeleteIcon } from '@assets';
import React, { useEffect, useState } from 'react';

interface EmbedLinkProps {
  link: string;
  onClose: () => void;
}

const DESKTOP_WIDTH = 1920;

function EmbedLink({ link, onClose }: EmbedLinkProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [initialPosition, setInitialPosition] = useState(0);
  const [dimension, setDimension] = useState({ width: 700, height: 400 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialPosition(
      window.innerWidth >= DESKTOP_WIDTH ? e.clientX : e.clientY,
    );
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newValue =
        windowWidth >= DESKTOP_WIDTH
          ? e.clientX - initialPosition
          : e.clientY - initialPosition;
      setInitialPosition(windowWidth >= DESKTOP_WIDTH ? e.clientX : e.clientY);

      if (windowWidth >= DESKTOP_WIDTH) {
        const newWidth = dimension.width + newValue;
        if (newWidth >= 430 && newWidth <= 800) {
          setDimension((prev) => ({ ...prev, width: newWidth }));
        }
      } else {
        const newHeight = dimension.height + newValue;
        if (newHeight >= 200 && newHeight <= 600) {
          setDimension((prev) => ({ ...prev, height: newHeight }));
        }
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove]);

  return (
    <div className="flex h-screen flex-col items-center overflow-auto bg-blue-50 desktop:flex-row">
      <div className="flex h-full w-full flex-col desktop:ml-[280px] desktop:w-auto">
        <div className="flex w-full justify-end p-2">
          <DeleteIcon
            className="cursor-pointer fill-slate-800"
            onClick={onClose}
          />
        </div>
        <div
          style={{ width: dimension.width, height: dimension.height }}
          className="mr-2 flex flex-1 items-center"
        >
          <iframe
            src={link}
            title="link embed"
            className={`${windowWidth >= DESKTOP_WIDTH ? 'aspect-square w-full' : 'h-full w-full'} `}
            onError={() => console.log('no')}
          />
        </div>
      </div>
      <div
        className={`${
          windowWidth >= DESKTOP_WIDTH
            ? 'h-full w-1 cursor-col-resize'
            : 'h-1 w-full cursor-row-resize'
        } bg-blue-100 hover:bg-blue-500`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default EmbedLink;
