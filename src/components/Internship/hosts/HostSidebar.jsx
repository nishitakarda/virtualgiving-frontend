import React from 'react';

const HostSidebar = ({ setActivePage, activePage }) => {
  const menuItems = [
    { label: 'Post Internships', key: 'post' },
    { label: 'View Applications', key: 'view' },
  ];

  return (
    <div className="w-60 bg-white dark:bg-gray-600/40 border-r dark:border-gray-800 p-4 shadow-md dark:shadow-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-5 dark:text-white">Internship Manager</h2>
      <ul className="space-y-3">
        {menuItems.map(({ label, key }) => (
          <li
            key={key}
            onClick={() => setActivePage(key)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all font-medium ${
              activePage === key
                ? 'bg-blue-100 text-blue-500 dark:bg-blue-400/20 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostSidebar;
