import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';
import LoadingSpinner from "../components/LoadingSpinner";
import { MdPerson, MdSearch, MdSchool } from "react-icons/md";
import { motion } from "framer-motion";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [searchYear, setSearchYear] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/all");
      if (response.status === 200) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchName.toLowerCase());
      const yearMatch = searchYear === '' || user.graduationYear?.toString() === searchYear;
      return nameMatch && yearMatch;
    });
    setFilteredUsers(filtered);
  }, [searchName, searchYear, users]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-6 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Search Users
      </h1>

      {/* Search Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <div className="relative w-full sm:w-1/3">
          <MdSearch className="absolute top-3 left-3 text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="pl-10 p-2 w-full rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="relative w-full sm:w-1/3">
          <MdSchool className="absolute top-3 left-3 text-gray-500 dark:text-gray-300" />
          <input
            type="number"
            placeholder="Search by Graduation Year"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            className="pl-10 p-2 w-full rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-4"
                />
              ) : (
                <MdPerson size={60} className="text-gray-500 dark:text-gray-300 ring rounded-full p-2 my-2" />
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                🎓 Batch: {user.graduationYear || 'N/A'}
              </p>
              <Link
                to={`/user-profile/${user.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition"
              >
                View Profile
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
