import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaClipboardList, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get('/donations/alumni/approved');
        setRequests(response.data);
        toast.success('Donation requests loaded successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to load donation requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-8 flex items-center justify-center gap-3">
        <FaClipboardList /> Donation Requests
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
          <img src="/not_found.webp" alt="Not Found" className="w-40 h-40 object-contain" />
          <p className="text-gray-600 dark:text-gray-400">
            No approved donation requests at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {requests.map((req, index) => (
            <motion.div
              key={req.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                {req.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{req.description}</p>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
                <FaEnvelope className="text-blue-500" /> {req.email}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <FaPhoneAlt className="text-green-500" /> {req.phone}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
