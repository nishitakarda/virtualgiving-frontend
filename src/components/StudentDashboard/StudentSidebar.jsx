import {
  FaBriefcase,
  FaBullhorn,
  FaDonate,
  FaFileAlt,
  FaTachometerAlt,
  FaUserCircle
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const StudentSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const links = [
    { to: '/student-profile', label: 'Profile', icon: <FaUserCircle /> },
    { to: '/student-dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { to: '/mentorship-opportunities', label: 'Mentorship Opportunities', icon: <FaBullhorn /> },
    { to: '/applications', label: 'My Applications', icon: <FaFileAlt /> },
    { to: '/donation-requests', label: 'Donation Requests', icon: <FaDonate /> },
    { to: '/internship-opportunities', label: 'Internship Opportunities', icon: <FaBriefcase /> },
    { to: '/applied-internships', label: 'Internship Applications', icon: <FaFileAlt /> },
  ];

  const linkClasses = 'flex items-center gap-4 px-3 py-2 rounded transition-colors duration-200';
  const hoverClasses = 'hover:dark:bg-gray-900/30 hover:dark:text-white hover:bg-gray-100 hover:font-bold';

  return (
    <div className={`z-70 flex flex-col justify-between top-0 left-0 h-screen w-80 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300
    transition-transform duration-300 ease-in-out transform gap-4 fixed ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}>
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
                    className={`${linkClasses} ${hoverClasses} ${isActive ? 'bg-gray-200 dark:bg-gray-900/30 font-bold' : ''
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


    </div>
  );
};

export default StudentSidebar;
