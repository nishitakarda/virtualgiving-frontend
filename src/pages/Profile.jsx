import { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    github: '',
    linkedin: '',
    course: '',
    college: '',
    graduationYear: '',
  });

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/user/me');
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      await axiosInstance.put('/user/update', userData);
      toast.success('Profile updated successfully');
      fetchUser();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10 flex flex-col gap-6 lg:flex-row bg-gray-100 dark:bg-gray-900">
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-1/2 bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="relative">
          <div className="h-36 sm:h-40 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="absolute -bottom-14 left-4 sm:left-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl">
            {userData.photo ? (
              <img src={userData.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 bg-gray-200 dark:bg-gray-700">
                <MdPerson size={70} />
              </div>
            )}
          </div>
        </div>
        <div className="pt-20 sm:pt-24 px-4 sm:px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {userData.name || 'Student Name'}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mb-4 capitalize">{userData.role || 'Student'}</p>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-800 dark:text-gray-200">
              <tbody>
                {[
                  ['Email', userData.email],
                  ['Phone', userData.phone],
                  ['City', userData.city],
                  ['Github', userData.github],
                  ['LinkedIn', userData.linkedin],
                  ['Course', userData.course],
                  ['College', userData.college],
                  ['Graduation Year', userData.graduationYear],
                ].map(([label, value]) => (
                  <tr key={label} className="border-t dark:border-gray-700">
                    <th className="px-4 py-2 font-medium bg-gray-50 dark:bg-gray-700 w-1/3">
                      {label}
                    </th>
                    <td className="px-4 py-2 break-words max-w-[220px] sm:max-w-[300px]">
                      {value || <span className="italic text-gray-400">N/A</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Update Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Update Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['Name', 'name'],
            ['Email', 'email'],
            ['Phone', 'phone'],
            ['City', 'city'],
            ['Github', 'github'],
            ['LinkedIn', 'linkedin'],
            ['Course', 'course'],
            ['College', 'college'],
            ['Graduation Year', 'graduationYear'],
          ].map(([label, key]) => (
            <div key={key}>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">{label}</label>
              <input
                type={key === 'graduationYear' ? 'number' : 'text'}
                value={userData[key] || ''}
                onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-700 bg-gray-50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg shadow"
          onClick={updateProfile}
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
