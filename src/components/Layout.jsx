import React, { useState } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/StudentDashboard/Sidebar';
import Topbar from '../components/StudentDashboard/Topbar';
import DashboardCard from '../components/StudentDashboard/DashboardCard';
import {
  FaFolderOpen,
  FaRocket,
  FaBell,
  FaUserCircle,
  FaBookmark,
  FaBriefcase,
  FaDonate,
  FaCalendarAlt,
} from 'react-icons/fa';

const Layout = () => {
  const cardData = [
     { title: 'My Applications', icon: <FaFolderOpen />, value: '5', subtext: 'Total Submitted' },
     { title: 'New Opportunities', icon: <FaRocket />, value: '8', subtext: 'Available Now' },
     { title: 'Notifications', icon: <FaBell />, value: '3', subtext: 'Unread Alerts' },
     { title: 'Profile Status', icon: <FaUserCircle />, value: '85%', subtext: 'Profile Complete' },
     { title: 'Saved Opportunities', icon: <FaBookmark />, value: '4', subtext: 'Bookmarked' },
     { title: 'Internships Applied', icon: <FaBriefcase />, value: '2', subtext: 'Pending/Review' },
     { title: 'Total Donations', icon: <FaDonate />, value: '₹3,000', subtext: 'Received / Requested' },
     { title: 'Mentorship Schedule', icon: <FaCalendarAlt />, value: 'Today, 5 PM', subtext: 'Next Session' },
   ];
   
     const [sidebarOpen, setSidebarOpen] = useState(false);
   
     const toggleSidebar = () => {
       setSidebarOpen(!sidebarOpen);
     };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-white">
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex  flex-col">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="grow  flex flex-col overflow-y-auto">
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout