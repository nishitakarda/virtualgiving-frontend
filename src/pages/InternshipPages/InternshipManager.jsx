import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from '../../components/LoadingSpinner';
import axiosInstance from "../../utils/axiosInstance";

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/internships/my');
      if (response.status === 200) {
        setInternships(response.data);
      } else {
        toast.error("Failed to fetch internships");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-20 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800 dark:text-blue-400 flex items-center justify-center gap-2">
          📋 Posted Internships
        </h1>

        {internships.length > 0 ? (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <table className="min-w-full table-auto text-sm sm:text-base">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Salary</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Applications</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-100">
                {internships.map((intern) => (
                  <tr
                    key={intern.id}
                    className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-3 px-4">{intern.id}</td>
                    <td className="py-3 px-4">{intern.title}</td>
                    <td className="py-3 px-4">{intern.salary || 'N/A'}</td>
                    <td className="py-3 px-4">{intern.location}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/internship-application/${intern.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        View Applications
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center gap-6">
            <img
              src="/not_found.webp"
              alt="No Internships"
              className="w-48 sm:w-64 object-contain"
            />
            <p className="text-gray-700 dark:text-gray-300">
              No internships posted yet.
            </p>
            <Link
              to="/post-internship"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Post an Internship
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default InternshipManager;
