import React from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Topbar = ({ toggleSidebar }) => {
  const role = localStorage.getItem('role') ; 

  const getBreadcrumb = () => {
    switch (role) {
      case 'STUDENT':
        return 'Home / Dashboard / Student';
      case 'ORGANIZATION':
        return 'Home / Dashboard / Organization';
      case 'ALUMNI':
        return 'Home / Dashboard / Alumni';
      default:
        return 'Home / Dashboard';
    }
  };

  return (
    <div className="w-full bg-white z-40 text-gray-900 dark:bg-gray-900 dark:text-white/70 shadow flex justify-between items-center px-6 py-4">
      <div className="flex items-center space-x-4">
        <FaBars
          className="text-2xl cursor-pointer md:hidden"
          onClick={toggleSidebar}
        />
        <span className="text-sm hidden sm:inline">{getBreadcrumb()}</span>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search here..."
          className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm"
        />
        <FaBell className="text-xl cursor-pointer" />
        <FaUserCircle className="text-2xl cursor-pointer" />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AppTopbar;
