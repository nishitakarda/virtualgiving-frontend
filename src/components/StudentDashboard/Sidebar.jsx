import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaUserCircle, FaTachometerAlt, FaBell, FaBullhorn, FaFileAlt,
  FaClipboardList, FaDonate, FaBriefcase, FaCog, FaSignOutAlt,
  FaHome
} from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = false;
  const token = localStorage.getItem('token');

  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
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

  const linkClasses = 'flex items-center gap-4 px-3 py-2 rounded transition-colors duration-200';
  const hoverClasses = 'hover:dark:bg-gray-900/30 hover:dark:text-white hover:bg-gray-100 hover:font-bold';

  return (
    <div className={`z-70 flex flex-col justify-between top-0 left-0 h-screen w-80 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300
    transition-transform duration-300 ease-in-out transform gap-4 fixed ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0` }>
      <div>
        <div className="text-center py-4 border-b border-gray-300 relative">
          <img className='w-24 mx-auto' src="/logo2.png" alt="" />
        <h1 className="text-lg px-4 py-1 font-semibold ">
          Virtual Giving & Volunteering
        </h1>

        {/* Close button on mobile */}
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
                  onClick={toggleSidebar} // close sidebar on mobile
                  className={`${linkClasses} ${hoverClasses} ${
                    isActive ? 'bg-gray-200 dark:bg-gray-900/30 font-bold' : ''
                  }`}
                >
                  {icon} {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      </div>

      <div className="px-4 pb-6">
       {
        token ?   <button
          onClick={() => {
            navigate('/login');
            localStorage.removeItem('token');
          }
          }
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-500 transition-colors text-white py-2 rounded"
        >
          <FaSignOutAlt /> Logout
        </button> : <div className='flex gap-4'>
         <Link to={'/register'}
          className="w-full flex items-center justify-center gap-2 border border-teal-600 hover:bg-gray-500 transition-colors text-teal-600 py-2 rounded"
        >Signup
        </Link>
           <Link to={'/login'}
          className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-gray-500 transition-colors text-white py-2 rounded"
        >Login
        </Link>
        </div>
       }
      
      </div>
    </div>
  );
};

export default Sidebar;
