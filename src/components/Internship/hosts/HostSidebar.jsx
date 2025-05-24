import React from 'react';

const HostSidebar = ({ setActivePage, activePage }) => {
  const menuItems = [
    { label: 'Post Internships', key: 'post' },
    { label: 'View Applications', key: 'view' },
  ];

  return (
    <div className="w-60 bg-white border-r p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">Internship Manager</h2>
      <ul className="space-y-3">
        {menuItems.map(({ label, key }) => (
          <li
            key={key}
            onClick={() => setActivePage(key)}
            className={`cursor-pointer p-2 rounded-lg ${
              activePage === key ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
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
