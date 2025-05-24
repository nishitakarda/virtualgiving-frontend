import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const HostTopbar = () => {
  const name = localStorage.getItem('name') || /*deafult*/'Host User';

  return (
    <div className="w-full bg-white shadow flex justify-between items-center px-6 py-4 z-50">
      <div className="text-xl font-semibold text-sky-700">
        Virtual Giving and Volunteering
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Hi, {name}</span>
        <FaUserCircle className="text-3xl text-gray-700" />
      </div>
    </div>
  );
};

export default HostTopbar;
