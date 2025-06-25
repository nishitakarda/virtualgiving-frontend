import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-white">
      <div className="flex-1 flex flex-col">
        <div className="grow flex flex-col overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout
