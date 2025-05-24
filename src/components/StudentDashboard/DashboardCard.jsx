import React from 'react';
import { IconContext } from 'react-icons';

const DashboardCard = ({ title, icon, value, subtext }) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow hover:shadow-md transform transition duration-200 hover:scale-[1.02] cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
          <IconContext.Provider value={{ className: 'w-6 h-6' }}>
            {icon}
          </IconContext.Provider>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
