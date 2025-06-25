import { useState } from "react";
import LoadingSpinner from '../../components/LoadingSpinner';
import RequestMentorship from "../../components/Mentorship/hosts/RequestMentorship";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const MentorshipRequests = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchInternships = async () => {
    setLoading(true);
    const response = await axiosInstance.get('/applications/my');

    if (response.status == 200) {
      setApplications(response.data);
    } else {
      console.log(response);
    }
    setLoading(false);
  }


  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-4 md:py-8">
        <h1 className="text-lg md:text-3xl text-center font-bold mb-4 text-gray-900 dark:text-teal-400">
          Mentorship Requests
        </h1>

        <div className="overflow-x-auto">
          {
            applications.length != 0 ? <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Posted By</th>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Location</th>
                  <th className="py-3 px-6 text-left">Date Applied</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-100">
                {applications?.map((app) => (
                  <tr key={app.id} className="border-t border-gray-300 dark:border-gray-700">
                    <td className="py-3 px-6">{app.internship.postedBy.email}</td>
                    <td className="py-3 px-6">{app.internship.title}</td>
                    <td className="py-3 px-6">{app.internship.location}</td>
                    <td className="py-3 px-6">{app.appliedAt || 'unknown'}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === "Approved"
                            ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-200"
                            : app.status === "Rejected"
                              ? "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200"
                              : "bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-200"
                          }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> : showForm ? <RequestMentorship handleCancel={() => setShowForm(false)} />
              :
               <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
            <img
              src="/not_found.webp"
              alt="Not Found"
              className="w-40 h-40 object-contain"
            />
            <p className="text-gray-600 dark:text-gray-400">
              No Mentorship request at this moment.
            </p>
           
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default MentorshipRequests;
