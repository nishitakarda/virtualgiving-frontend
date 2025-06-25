import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";

const AppliedInternships = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/applications/my");

      if (response.status === 200) {
        setApplications(response.data);
      } else {
        console.log(response);
      }
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-8 py-10">

        {applications.length !== 0 ? (
          <div className="overflow-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Posted By</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Title</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Location</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Date Applied</th>
                  <th className="py-3 px-6 text-left whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="py-3 px-6">{app.internship.postedBy.email}</td>
                    <td className="py-3 px-6">{app.internship.title}</td>
                    <td className="py-3 px-6">{app.internship.location}</td>
                    <td className="py-3 px-6">
                      {app.appliedAt
                        ? new Date(app.appliedAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 inline-block rounded-full text-xs font-semibold 
                        ${app.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                            : app.status === "Rejected"
                              ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                          }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
            <img
              src="/not_found.webp"
              alt="Not Found"
              className="w-40 h-40 object-contain"
            />
            <p className="text-gray-600 dark:text-gray-400">
              You haven’t applied to any internships yet.
            </p>
            <Link
              to="/internship-opportunities"
              className="text-teal-600 dark:text-teal-300 border border-teal-600 dark:border-teal-300 px-4 py-2 rounded hover:bg-teal-50 dark:hover:bg-teal-800 transition"
            >
              Browse Internships
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AppliedInternships;
