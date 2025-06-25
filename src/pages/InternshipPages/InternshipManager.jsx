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
        console.log(response);
      }
    } catch (e) {
      toast.error(e.message);
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          📋 Posted Internships
        </h1>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
          {internships.length !== 0 ? (
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
                    <td className="py-3 px-4">{intern.salary || 'Unknown'}</td>
                    <td className="py-3 px-4">{intern.location}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/internship-application/${intern.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        View Applications
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center mt-16 text-center">
              <img
                src="/not_found.webp"
                alt="No Internships"
                className="w-64 sm:w-80 mb-6"
              />
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No internships posted yet.
              </p>
              <Link
                to="/post-internship"
                className="text-white bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg shadow-md"
              >
                ➕ Post an Internship
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InternshipManager;
