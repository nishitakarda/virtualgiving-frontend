import React from 'react';
import { IconContext } from 'react-icons';

const DashboardCard = ({ title, icon, value, subtext }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-md transform transition duration-200 hover:scale-[1.02] cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
          <IconContext.Provider value={{ className: 'w-6 h-6' }}>
            {icon}
          </IconContext.Provider>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-100">{title}</h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-200">{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
