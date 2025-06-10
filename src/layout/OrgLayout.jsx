import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import OrgTopbar from '../components/AppTopbar';
import OrgSidebar from '../components/OrgDashboard/OrgSidebar';

const OrgLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-white">
      <OrgSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col">
        <OrgTopbar toggleSidebar={toggleSidebar} />
        <div className="grow flex flex-col overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrgLayout;
