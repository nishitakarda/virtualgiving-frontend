import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import LoadingSpinner from '../../LoadingSpinner';

const ViewMentorshipApplications = () => {
  const [applications, setApplications] = useState([]);
  const { id } = useParams();

  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/applications/${id}/status`, {}, { params: { status: newStatus.toUpperCase() } });
      console.log(response);

      if (response.status == 200) {
        toast.success('Status Updated', { position: 'top-center' });
        fetchApplications();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/applications/internship/${id}`);
      console.log(response);

      if (response.status == 200) {
        setApplications(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <LoadingSpinner />
  else return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6">
        View Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="w-12 px-4 py-3 text-left">ID</th>
              <th className="w-1/5 px-4 py-3 text-left">Student Name</th>
              <th className="w-1/5 px-4 py-3 text-left">email</th>
              <th className="w-1/5 px-4 py-3 text-left">Resume</th>
              <th className="w-1/5 px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-gray-100">
            {applications.map((app, index) => (
              <tr
                key={app.id}
                className="border-t border-gray-300 dark:border-gray-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{app?.student?.name}</td>
                <td className="px-4 py-3">{app?.student?.email}</td>
                <td className="px-4 py-3">
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-3">
                  <select
                    onChange={(e) =>
                      handleStatusChange(app.id, e.target.value)
                    }
                    className={`w-full px-2 py-1 border rounded text-sm bg-gray-100 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-500
                      ${app.status === 'PENDING'
                        ? 'text-yellow-600 border-yellow-300'
                        : app.status === 'SELECTED'
                          ? 'text-green-600 border-green-300'
                          : 'text-red-600 border-red-300'
                      }`}
                  >
                    <option hidden value="Pending">Pending</option>
                    <option selected={app.status == "SELECTED"} value="Selected">Selected</option>
                    <option selected={app.status == "REJECTED"} value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMentorshipApplications;
