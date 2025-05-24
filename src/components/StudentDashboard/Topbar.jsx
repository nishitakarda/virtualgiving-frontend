import React from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-white shadow flex justify-between items-center px-6 py-4">
      <div className="flex items-center space-x-4">
        <FaBars
          className="text-2xl cursor-pointer md:hidden"
          onClick={toggleSidebar}
        />
        <span className="text-sm text-gray-500 hidden sm:inline">
          Home / Dashboard / Students
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search here..."
          className="border rounded-full px-3 py-1 text-sm text-gray-600 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <FaBell className="text-xl cursor-pointer text-gray-700" />
        <FaUserCircle className="text-2xl cursor-pointer text-gray-700" />
      </div>
    </div>
  );
};

export default Topbar;
