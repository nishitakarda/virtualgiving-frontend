import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const isLoggedIn = !!token;

  // ✅ Show navbar only on home page
  const shouldHideNavbar = location.pathname !== '/';
  if (shouldHideNavbar) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <nav className='shadow-md flex items-center justify-between px-8 py-6 bg-white'>
      <div className='container flex justify-between w-full'>
        <p className="text-xl font-semibold">Virtual Giving and Volunteering</p>

        {
          !isLoggedIn ? (
            <div className='space-x-4'>
              <Link to='/login' className='border border-sky-500 rounded-full text-sky-500 px-4 py-2'>Login</Link>
              <Link to='/register' className='bg-sky-500 rounded-full text-white px-4 py-2'>Register</Link>
            </div>
          ) : (
            <div className='flex items-center space-x-4'>
              <span className='text-gray-700'>{email}</span>
              <button
                onClick={handleLogout}
                className='bg-sky-500 rounded-full text-white px-4 py-2 cursor-pointer'
              >
                Logout
              </button>
            </div>
          )
        }
      </div>
    </nav>
  );
};

export default NavBar;
