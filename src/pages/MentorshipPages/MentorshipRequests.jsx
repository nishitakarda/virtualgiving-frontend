import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";
import { MdPerson } from "react-icons/md";

const MentorshipRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/mentorship-requests/all");
      if (response.status === 200) {
        setRequests(response.data);
        console.log(response.data);
        
      } else {
        console.error("Unexpected response", response);
      }
    } catch (error) {
      console.error("Error fetching mentorship requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-8 py-8">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-900 dark:text-teal-400">
        All Mentorship Requests
      </h1>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
          <img
            src="/not_found.webp"
            alt="Not Found"
            className="w-40 h-40 object-contain"
          />
          <p className="text-gray-600 dark:text-gray-400">
            No mentorship requests available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase">
              <tr>
                <th className="py-3 px-6 text-left">Student</th>
                <th className="py-3 px-6 text-left">Subject</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Requested On</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-100">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-t border-gray-300 dark:border-gray-700"
                >
                  <td className="py-3 px-6 flex items-center gap-3">
                    {req.student?.profilePic ? (
                      <img
                        src={req.student.profilePic}
                        alt={req.student.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <MdPerson size={24} className="text-gray-400" />
                    )}
                    <span>{req.requestedBy || "Unknown"}</span>
                  </td>
                  <td className="py-3 px-6 font-medium">{req.subject}</td>
                  <td className="py-3 px-6">{req.description}</td>
                  <td className="py-3 px-6">
                    {new Date(req.requestedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MentorshipRequests;
