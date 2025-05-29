import React, { useState } from 'react';

import AlumniDashboardCard from '../components/AlumniDashboard/AlumniDashboardCard'; 
import {
  FaUserGraduate,
  FaHandshake,
  FaBell,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaEnvelope,
  FaCalendarAlt,
} from 'react-icons/fa';

const alumniCardData = [
  { title: 'My Mentorships', icon: <FaUserGraduate />, value: '10', subtext: 'Active Mentorships' },
  { title: 'Networking Requests', icon: <FaHandshake />, value: '4', subtext: 'Pending Approvals' },
  { title: 'Notifications', icon: <FaBell />, value: '2', subtext: 'Unread Alerts' },
  { title: 'Profile Completion', icon: <FaClipboardList />, value: '90%', subtext: 'Complete' },
  { title: 'Alumni Events', icon: <FaUsers />, value: '3', subtext: 'Upcoming' },
  { title: 'Job Referrals', icon: <FaChartLine />, value: '5', subtext: 'In Process' },
  { title: 'Messages', icon: <FaEnvelope />, value: '8', subtext: 'Unread' },
  { title: 'Next Meetup', icon: <FaCalendarAlt />, value: 'June 5, 6 PM', subtext: 'Virtual Event' },
];

const AlumniDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Alumni Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Quick insights about your alumni activities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {alumniCardData.map((card, idx) => (
          <AlumniDashboardCard key={idx} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700/50 p-5 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Recent Alumni Activities</h2>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside dark:text-gray-100">
            <li>Mentorship request from student John Doe approved</li>
            <li>New networking request from Jane Smith</li>
            <li>Upcoming alumni event on June 5</li>
            <li>Message from organization about job openings</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700/50 p-5 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Upcoming Deadlines</h2>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside dark:text-gray-100">
            <li>📅 RSVP for alumni meetup by June 1</li>
            <li>📅 Submit feedback for mentorship program by May 30</li>
            <li>📅 Update profile by June 10</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
