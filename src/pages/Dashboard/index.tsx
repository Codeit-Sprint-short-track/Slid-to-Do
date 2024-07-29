import MyProgress from './components/MyProgress';
import RecentTodos from './components/RecentTodos';
import TodosByGoal from './components/TodosByGoal';

function DashboardPage() {
  return (
    <div className="flex min-h-screen justify-center bg-slate-200 desktop:min-w-[1920px]">
      <div className="flex w-[375px] flex-col pb-16 pt-6 tablet:w-[637px] desktop:w-[1200px]">
        <div className="text-lg font-semibold leading-7 text-slate-900">
          대시보드
        </div>
        <div className="mt-4 flex w-full flex-col gap-6 tablet:flex-row">
          <div className="tablet:min-w-0 tablet:flex-1">
            <RecentTodos />
          </div>
          <div className="tablet:min-w-0 tablet:flex-1">
            <MyProgress />
          </div>
        </div>
        <TodosByGoal />
      </div>
    </div>
  );
}

export default DashboardPage;
