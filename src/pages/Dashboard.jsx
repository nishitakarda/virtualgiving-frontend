import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DashboardCard from '../components/DashboardCard';
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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar toggleSidebar={toggleSidebar} />

        <div className="px-6 py-4">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">Quick insights about your activity</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardData.map((card, idx) => (
              <DashboardCard key={idx} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Recent Activities</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📤 Application to XYZ Internship submitted</li>
                <li>🔔 2 new notifications received</li>
                <li>🎓 Mentorship session today at 5 PM</li>
                <li>💼 ABC application is under review</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Upcoming Deadlines</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📅 Submit resume for XYZ by May 21</li>
                <li>📅 Complete profile to 100% by May 23</li>
                <li>📅 Confirm bank details for donation payout by May 25</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
