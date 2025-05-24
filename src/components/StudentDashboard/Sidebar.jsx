import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaUserCircle, FaTachometerAlt, FaBell, FaBullhorn, FaFileAlt,
  FaClipboardList, FaDonate, FaBriefcase, FaCog, FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { to: '/profile', label: 'Profile', icon: <FaUserCircle /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/notifications', label: 'Notifications', icon: <FaBell /> },
    { to: '/opportunities', label: 'Opportunities', icon: <FaBullhorn /> },
    { to: '/applications', label: 'My Applications', icon: <FaFileAlt /> },
    { to: '/mentorship-requests', label: 'Mentorship Requests', icon: <FaClipboardList /> },
    { to: '/donation-requests', label: 'Donation Requests', icon: <FaDonate /> },
    { to: '/internship-opportunities', label: 'Internship Opportunities', icon: <FaBriefcase /> },
    { to: '/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const linkClasses = 'flex items-center gap-3 text-lg font-semibold px-3 py-2 rounded transition-colors duration-200';
  const defaultTextColor = 'text-gray-300';
  const hoverClasses = 'hover:text-yellow-400 hover:bg-gray-200 cursor-pointer';

  return (
    <div
      className={`
        fixed z-40 top-0 left-0 h-full w-64 bg-gray-700 shadow-lg text-gray-300 transform
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}
    >
      <div className="text-center py-6 border-b border-gray-600 relative">
        <h1 className="text-2xl font-bold px-4 leading-tight text-white">
          Virtual Giving
          <br />
          and Volunteering
        </h1>

        {/* Close button on mobile */}
        <button
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-gray-400 md:hidden"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-6">
        <ul className="space-y-1">
          {links.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  onClick={toggleSidebar} // close sidebar on mobile
                  className={`${linkClasses} ${hoverClasses} ${
                    isActive ? 'bg-gray-700 text-white font-bold' : defaultTextColor
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 transition-colors text-white py-2 rounded"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
