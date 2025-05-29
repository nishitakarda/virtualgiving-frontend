import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaUserCircle, FaTachometerAlt, FaBell, FaClipboardList,
  FaDonate, FaBriefcase, FaCog, FaHome
} from 'react-icons/fa';

const AlumniSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/alumni-profile', label: 'Profile', icon: <FaUserCircle /> },
    { to: '/alumni-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/notifications', label: 'Notifications', icon: <FaBell /> },
    { to: '/mentorship-requests', label: 'Mentorship Requests', icon: <FaClipboardList /> },
    { to: '/donation-requests', label: 'Donation Requests', icon: <FaDonate /> },
    { to: '/internship-manager', label: 'Manage Internships', icon: <FaBriefcase /> },
    { to: '/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const linkClasses = 'flex items-center gap-4 px-3 py-2 rounded transition-colors duration-200';
  const hoverClasses = 'hover:dark:bg-gray-900/30 hover:dark:text-white hover:bg-gray-100 hover:font-bold';

  return (
    <div className={`z-70 flex flex-col justify-between top-0 left-0 h-screen w-80 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300
    transition-transform duration-300 ease-in-out transform gap-4 fixed ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}>
      <div>
        <div className="text-center py-4 border-b border-gray-300 relative">
          <img className='w-24 mx-auto' src="/logo2.png" alt="Logo" />
          <h1 className="text-lg px-4 py-1 font-semibold">Virtual Giving & Volunteering</h1>
          <button
            onClick={toggleSidebar}
            className="absolute right-4 top-4 text-gray-400 md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="overflow-y-auto px-2 py-6">
          <ul className="space-y-1">
            {links.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={toggleSidebar}
                    className={`${linkClasses} ${hoverClasses} ${isActive ? 'bg-gray-200 dark:bg-gray-900/30 font-bold' : ''}`}
                  >
                    {icon} {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AlumniSidebar;
