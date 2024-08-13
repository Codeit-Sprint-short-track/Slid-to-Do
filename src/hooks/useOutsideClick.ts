import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: ((e?: MouseEvent) => void) | null,
) => {
  useEffect(() => {
    if (!callback) return undefined;

    const handleClickOutside = (e: MouseEvent) => {
      const { target } = e;

      if (ref.current && !ref.current.contains(target as Node)) {
        callback(e);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref, callback]);
};

export default useOutsideClick;
