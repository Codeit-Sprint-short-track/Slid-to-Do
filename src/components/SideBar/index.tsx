import useGetGoals from '@hooks/api/goalsAPI/useGetGoals';
import useGetUser from '@hooks/api/userAPI/useGetUser';
import useWindowWidth from '@hooks/useWindowWidth';
import { useEffect, useState } from 'react';
import DesktopSideBar from './DesktopSideBar';
import MobileSideBar from './MobileSideBar';

function SideBar() {
  const width = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    if (width >= 1920) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [width]);

  const { data: userData } = useGetUser();
  const { data: goalData } = useGetGoals();

  useEffect(() => {
    console.log(goalData?.pages[0].data.goals);
  }, [goalData]);

  if (!userData || !goalData) return null;

  return (
    <>
      {width >= 744 ? (
        <DesktopSideBar
          toggleSideBar={toggleSidebar}
          isOpen={isOpen}
          width={width}
          userData={userData.data}
          goalData={goalData.pages[0].data.goals}
        />
      ) : (
        <MobileSideBar
          toggleSideBar={toggleSidebar}
          isOpen={isOpen}
          userData={userData.data}
          goalData={goalData.pages[0].data.goals}
        />
      )}
    </>
  );
}

export default SideBar;
