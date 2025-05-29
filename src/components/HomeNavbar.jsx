import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle.jsx';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  // Show navbar only on the home page
  const isHomePage = location.pathname === '/';
  if (!isHomePage) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="w-full mx-auto  bg-white dark:bg-gray-900 shadow z-40 text-gray-900 dark:text-white">
      <div className="w-full flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo2.png" className="w-15 h-15 object-contain" alt="Logo" />
          <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
            Virtual Giving and Volunteering
          </p>
        </div>

        <div className="flex items-center space-x-5">

          {token ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">{email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-800 py-3 px-7 rounded transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="bg-teal-600 text-white hover:bg-teal-700 py-3 px-7 rounded transition"
              >
                Login
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
