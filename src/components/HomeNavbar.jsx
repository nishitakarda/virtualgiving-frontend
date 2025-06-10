import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './theme/ThemeToggle.jsx';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Show navbar only on the home page
  const isHomePage = location.pathname === '/';
  if (!isHomePage) return null;

  useEffect(()=>{
     if(token) {
       const savedRole = localStorage.getItem('role')?.toUpperCase();

        if (savedRole === 'STUDENT') {
          navigate('/student-dashboard');
        } else if (savedRole === 'ORGANIZATION') {
          navigate('/org-dashboard');
        } else if (savedRole === 'ALUMNI') {
          navigate('/alumni-dashboard');
        } else {
          alert('Invalid role detected!');
        }
     }
  }, [])

  return (
    <nav className="w-full mx-auto  bg-white dark:bg-gray-900 shadow z-40 text-gray-900 dark:text-white">
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/logo2.png" className="w-12 h-12 object-contain" alt="Logo" />
          <p className="text-xl  font-bold text-gray-800 dark:text-white whitespace-nowrap">
            Virtual Giving & Volunteering
          </p>
        </div>

        <div className="flex items-center space-x-5">
               
          <div className='hidden md:block'><ThemeToggle  /></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
