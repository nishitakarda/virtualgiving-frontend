import { useEffect, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import axiosInstance from '../utils/axiosInstance';

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
      console.log(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await axiosInstance.put('/user/update', userData);
      toast.success('Profile updated successfully');
      fetchUser();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='p-6 flex flex-col lg:flex-row gap-6'>
      {/* Profile Card */}
      <div className='w-full lg:w-1/2 bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden'>
        <div className='relative'>
          <div className='h-40 bg-gray-300 dark:bg-gray-700'></div>
          <div className='absolute -bottom-16 left-6 w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-lg bg-white'>
            {userData.photo ? (
              <img src={userData.photo} alt='Profile' className='w-full h-full object-cover' />
            ) : (
              <div className='flex items-center justify-center h-full text-gray-500 dark:bg-gray-800'>
                <MdPerson size={80} />
              </div>
            )}
          </div>
        </div>
        <div className='p-6 pt-20'>
          <h2 className='text-3xl font-bold mb-2'>{userData.name || 'Student Name'}</h2>
          <p className='text-gray-500 mb-4'>{userData.role || 'Student'}</p>
          <div className='space-y-3 text-sm text-gray-700 dark:text-gray-300'>
            <div className='flex justify-between'>
              <span>Email</span>
              <span className='font-medium'>{userData.email || "N/A"}</span>
            </div>
            <div className='flex justify-between'>
              <span>Phone</span>
              <span>{userData.phone || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span>City</span>
              <span>{userData.city || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span>Github</span>
              <span>{userData.github || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span>LinkedIn</span>
              <span>{userData.linkedin || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span>Course</span>
              <span>{userData.course || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span>College</span>
              <span>{userData.college || 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span>Graduation Year</span>
              <span>{userData.graduationYear || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Update Form */}
      <div className='w-full lg:w-1/2 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl'>
        <h2 className='text-xl font-semibold mb-4'>Update Profile</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
              <label className='block text-sm mb-1'>{label}</label>
              <input
                type='text'
                className='w-full px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                value={userData[key]}
                onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button
          className='mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow'
          onClick={updateProfile}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
