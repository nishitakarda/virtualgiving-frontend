import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const ManageUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only pending users
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/pending-users");
        setPendingUsers(response.data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/admin/update-user-status`, { userId, status: 'APPROVED' });
      setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("Updated Successfully")
    } catch (err) {
      toast.error(err.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (userId) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/admin/update-user-status`, { userId, status: 'REJECT' });
      setPendingUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("Updated Successfully")
    } catch (err) {
      toast.error(err.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading users...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Pending Users</h2>
      {pendingUsers.length === 0 ? (
        <p className="text-center text-gray-600">No pending users.</p>
      ) : (
        <ul className="space-y-4">
          {pendingUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {
                  user.profilePic ? <img
                    src={user.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  /> : <MdPerson className="bg-gray-200 rounded-full p-2" size={50} />
                }
                <div>
                  <p className="font-medium text-lg">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(user.id)}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageUsers;
