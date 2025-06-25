import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import LoadingSpinner from '../../LoadingSpinner';

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/applications/internship/${id}`);
      if (response.status === 200) {
        setApplications(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/applications/${appId}/status`,
        {},
        { params: { status: newStatus.toUpperCase() } }
      );
      if (response.status === 200) {
        toast.success('Status Updated', { position: 'top-center' });
        fetchApplications();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6 md:w-full max-w-7xl mx-auto">
      <h2 className="md:text-3xl font-semibold text-sky-700 dark:text-sky-400 mb-6 text-center">
        Internship Applications
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-gray-900 text-sm rounded-lg">
          <thead className="bg-sky-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Resume</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-sky-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{app?.student?.name}</td>
                <td className="px-4 py-3">{app?.student?.email}</td>
                <td className="px-4 py-3">
                  {app.resume ? (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Not available</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={app.status?.toUpperCase() || "PENDING"}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="SELECTED">Selected</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
