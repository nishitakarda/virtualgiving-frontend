import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUserGraduate,
  FaUniversity,
  FaCity,
  FaGithub,
  FaLinkedin,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import LoadingSpinner from '../components/LoadingSpinner';

const ViewUserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to load user profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!user) return <p className="text-center mt-10 text-gray-600">User not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
          ) : (
            <FaUserCircle size={128} className="text-gray-400 dark:text-gray-600" />
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4">
              {user.name}
            </h2>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              {user.email && (
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" /> {user.email}
                </p>
              )}
              {user.phone && (
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-green-500" /> {user.phone}
                </p>
              )}
              {user.city && (
                <p className="flex items-center gap-2">
                  <FaCity className="text-pink-500" /> {user.city}
                </p>
              )}
              {user.course && (
                <p className="flex items-center gap-2">
                  <FaUserGraduate className="text-indigo-500" /> {user.course}
                </p>
              )}
              {user.college && (
                <p className="flex items-center gap-2">
                  <FaUniversity className="text-purple-500" /> {user.college}
                </p>
              )}
              {user.graduationYear && (
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-orange-500" /> Graduation:{" "}
                  {user.graduationYear}
                </p>
              )}
              {(user.github || user.linkedin) && (
                <div className="mt-4 flex gap-4">
                  {user.github && (
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {user.linkedin && (
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <FaLinkedin /> LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserProfile;
