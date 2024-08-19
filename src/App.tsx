import SideBar from '@components/SideBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  const { pathname } = useLocation();

  const bgColor =
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname === '/notes/new'
      ? '#fff'
      : '#E2E8F0';

  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      if (localStorage.getItem('accessToken') === null) {
        navigate('sign-in');
      } else {
        navigate('dashboard');
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-dvh w-dvw max-w-full font-Pretendard text-base font-normal">
        {pathname !== '/sign-in' && pathname !== '/sign-up' && <SideBar />}
        <div className="ml-0 tablet:ml-[60px] desktop:ml-0">
          <Outlet />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
