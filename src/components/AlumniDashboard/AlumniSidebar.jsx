import {
  FaBriefcase,
  FaClipboardList,
  FaDonate,
  FaSearch,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUserCircle
} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AlumniSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: '/alumni-profile', label: 'Profile', icon: <FaUserCircle /> },
    { to: '/alumni/all-users', label: 'Search', icon: <FaSearch /> },
    { to: '/alumni-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/mentorship-requests', label: 'Mentorship Requests', icon: <FaClipboardList /> },
    { to: '/donation-requests', label: 'Donation Requests', icon: <FaDonate /> },
    { to: '/internship-manager', label: 'Manage Internships', icon: <FaBriefcase /> },
    { to: '/mentorship-manager', label: 'Manage mentorships', icon: <FaBriefcase /> },
    { to: '/post-internship', label: 'Post Internships', icon: <FaBriefcase /> },
    { to: '/post-mentorship', label: 'Post Mentorship', icon: <FaBriefcase /> },
  ];


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const linkClasses =
    'flex items-center gap-4 px-4 py-2 rounded-md transition-colors duration-200';
  const hoverClasses =
    'hover:bg-gray-100 hover:dark:bg-gray-900 hover:text-black hover:dark:text-white hover:font-bold';

  return (
    <div
      className={`z-50 flex flex-col justify-between top-0 left-0 h-screen w-80 shadow-lg bg-white dark:bg-gray-800 
      transition-transform duration-300 ease-in-out transform fixed 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}
    >
      {/* Top Section */}
      <div>
        <div className="text-center flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700 relative">
          <div className="flex items-center gap-2">
            <img className="w-10" src="/logo2.png" alt="Logo" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Virtual Giving
            </h1>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-2xl text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {links.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={toggleSidebar}
                    className={`${linkClasses} ${hoverClasses} ${isActive ? 'bg-gray-200 dark:bg-gray-700 font-bold' : ''
                      }`}
                  >
                    {icon} <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AlumniSidebar;
