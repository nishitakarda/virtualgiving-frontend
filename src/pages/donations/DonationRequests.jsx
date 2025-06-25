import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaClipboardList, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance';

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8 flex items-center justify-center gap-2">
        <FaClipboardList /> Donation Requests
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No donation requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{req.title}</h2>
              <p className="text-gray-700 mb-4">{req.description}</p>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <FaEnvelope className="text-blue-500" /> {req.email}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
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
