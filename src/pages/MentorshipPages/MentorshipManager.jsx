import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";

const MentorshipManager = () => {
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMentorships = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/mentorships/my");
      if (response.status === 200) {
        setMentorships(response.data);
      } else {
        toast.error("Failed to fetch mentorships");
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentorships();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="min-h-screen px-4 py-10 md:px-16 bg-gradient-to-tr from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-blue-800 dark:text-blue-400">
            📚 Your Mentorship Posts
          </h1>

          {mentorships.length > 0 ? (
            <div className="overflow-x-auto rounded-xl shadow-md">
              <table className="min-w-full bg-white dark:bg-gray-900 text-sm md:text-base rounded-xl overflow-hidden">
                <thead className="bg-blue-600 text-white uppercase">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Topic</th>
                    <th className="py-3 px-4 text-left">Date & Time</th>
                    <th className="py-3 px-4 text-left">Max Participants</th>
                    <th className="py-3 px-4 text-left">Applications</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 dark:text-gray-200">
                  {mentorships.map((mentorship, index) => (
                    <tr
                      key={mentorship.id}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <td className="py-3 px-4 font-medium">{index + 1}</td>
                      <td className="py-3 px-4">{mentorship.topic}</td>
                      <td className="py-3 px-4">
                        {new Date(mentorship.dateTime).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">{mentorship.maxParticipants}</td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/mentorship-application/${mentorship.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition duration-200"
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
                alt="No Mentorships"
                className="w-60 opacity-80"
              />
              <p className="text-lg text-gray-700 dark:text-gray-300">
                You haven’t posted any mentorships yet.
              </p>
              <Link
                to="/post-mentorship"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
              >
                Post Your First Mentorship
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MentorshipManager;
