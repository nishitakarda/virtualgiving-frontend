import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../utils/axiosInstance";

const ManageUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/pending-users");
      setPendingUsers(response.data);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      toast.error("Failed to load pending users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleStatusUpdate = async (userId, status) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/admin/update-user-status`, { userId, status });
      setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success(`User ${status.toLowerCase()}ed successfully`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl md:w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Pending User Approvals
      </h2>

      {pendingUsers.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-lg">
          🎉 All users are verified!
        </div>
      ) : (
        <ul className="space-y-6">
          <AnimatePresence>
            {pendingUsers.map((user) => (
              <motion.li
                key={user.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md gap-4"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-400"
                    />
                  ) : (
                    <MdPerson className="text-gray-500 bg-gray-200 dark:bg-gray-700 p-2 rounded-full w-14 h-14" />
                  )}
                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusUpdate(user.id, "APPROVED")}
                    className="dark:bg-green-900 bg-green-200 text-green-900 dark:text-green-200 px-5 py-2 rounded-md font-medium shadow-sm transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(user.id, "REJECT")}
                    className="dark:bg-red-900 bg-red-200 text-red-900 dark:text-red-200 px-5 py-2 rounded-md font-medium shadow-sm transition"
                  >
                    Reject
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default ManageUsers;
