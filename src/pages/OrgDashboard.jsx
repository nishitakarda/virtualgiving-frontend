import { useState } from 'react';
import {
  FaBell,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaClipboardCheck,
  FaEnvelope,
  FaFileAlt,
  FaUsers,
} from 'react-icons/fa';
import OrgDashboardCard from '../components/OrgDashboard/OrgDashboardCard';

const orgCardData = [
  { title: 'Active Internships', icon: <FaBriefcase />, value: '15', subtext: 'Currently Open' },
  { title: 'Applicants', icon: <FaUsers />, value: '120', subtext: 'Total Applied' },
  { title: 'Notifications', icon: <FaBell />, value: '6', subtext: 'Unread Alerts' },
  { title: 'Profile Completion', icon: <FaClipboardCheck />, value: '80%', subtext: 'Complete' },
  { title: 'Hiring Stats', icon: <FaChartBar />, value: '65%', subtext: 'Offer Rate' },
  { title: 'Reports Generated', icon: <FaFileAlt />, value: '9', subtext: 'This Month' },
  { title: 'Messages', icon: <FaEnvelope />, value: '3', subtext: 'Unread' },
  { title: 'Next Interview', icon: <FaCalendarAlt />, value: 'May 30, 11 AM', subtext: 'Scheduled' },
];

const OrgDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Organization Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Quick insights about your organization activities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {orgCardData.map((card, idx) => (
          <OrgDashboardCard key={idx} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700/50 p-5 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Recent Organization Activities</h2>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside dark:text-gray-100">
            <li>Internship posting for Summer 2025 completed</li>
            <li>120 new applications received</li>
            <li>Interview scheduled with candidate Jane Smith</li>
            <li>Monthly report generated for April 2025</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700/50 p-5 rounded-2xl shadow border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Upcoming Deadlines</h2>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside dark:text-gray-100">
            <li>📅 Close internship applications by May 25</li>
            <li>📅 Submit monthly hiring report by May 28</li>
            <li>📅 Prepare for onboarding session by June 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
