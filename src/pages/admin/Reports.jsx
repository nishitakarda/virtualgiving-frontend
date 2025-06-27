import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

const COLORS = ["#8884d8", "#00C49F", "#FF8042"];

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/admin/summary-stats");
      setStats(response.data);
    } catch (err) {
      toast.error("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  // Dummy fallback data (only used if no API available)
  const fallbackStats = {
    totalUsers: 120,
    usersByStatus: [
      { name: "Approved", value: 85 },
      { name: "Pending", value: 30 },
      { name: "Rejected", value: 5 },
    ],
    donations: {
      approved: 40,
      pending: 10,
      rejected: 5,
    },
    mentorships: {
      totalPosted: 25,
      totalApplications: 60,
    },
    internships: {
      totalPosted: 18,
      totalApplications: 50,
    },
  };

  const data = stats || fallbackStats;

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Admin Reports & Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Users by Status */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            User Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.usersByStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.usersByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Donations Bar */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Donation Request Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Approved', value: data.donations.approved },
              { name: 'Pending', value: data.donations.pending },
              { name: 'Rejected', value: data.donations.rejected },
            ]}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Mentorship Stats */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Mentorship Stats
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Posted', value: data.mentorships.totalPosted },
              { name: 'Applications', value: data.mentorships.totalApplications },
            ]}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Internship Stats */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Internship Stats
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Posted', value: data.internships.totalPosted },
              { name: 'Applications', value: data.internships.totalApplications },
            ]}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
