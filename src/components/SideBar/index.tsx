import { FoldIcon, HamburgerIcon, LogoIcon } from '@assets';
import useWindowWidth from '@hooks/useWindowWidth';
import { useState } from 'react';
import SideBarContents from './SideBarContents';

function SideBar() {
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {width >= 744 ? (
        <>
          <div
            className={`absolute left-0 top-0 h-dvh w-[280px] transform px-6 py-4 ${isOpen ? 'translate-x-0' : '-translate-x-[220px]'} bg-white transition-transform duration-300 ease-in-out`}
          >
            <div
              className={`fixed ${isOpen ? 'right-6' : 'right-[18px]'} top-5 h-5 w-6`}
            >
              {!isOpen && <LogoIcon width={23} height={23} className="mb-4" />}
              <button
                type="button"
                aria-label="expend button"
                onClick={toggleSidebar}
              >
                <FoldIcon className={`${isOpen ? 'rotate-0' : 'rotate-180'}`} />
              </button>
            </div>
            {isOpen && <SideBarContents />}
          </div>
        </>
      ) : (
        <>
          <div className="h-12 w-full bg-white">
            <button
              type="button"
              aria-label="hamburger button"
              onClick={toggleSidebar}
              className="ml-4 mt-3"
            >
              <HamburgerIcon />
            </button>
          </div>
          <div
            className={`absolute left-0 top-0 h-dvh w-full transform px-6 py-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white transition-transform duration-300 ease-in-out`}
          >
            <button
              type="button"
              aria-label="expend button"
              onClick={toggleSidebar}
              className="fixed right-6 top-5"
            >
              <FoldIcon />
            </button>
            {isOpen && <SideBarContents />}
          </div>
        </>
      )}
    </div>
  );
}

export default SideBar;
