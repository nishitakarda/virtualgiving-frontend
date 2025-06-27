import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../../utils/axiosInstance';

const RequestMentorship = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  });
  const [uploading, setUploading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/mentorship-requests/my', { withCredentials: true });
      setRequests(res.data || []);
    } catch (error) {
      toast.error('Failed to load mentorship requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const res = await axiosInstance.post('/mentorship-requests/create', formData, {
        withCredentials: true,
      });

      if (res.status === 200 || res.data?.success) {
        toast.success('Mentorship request submitted successfully');
        setFormData({ subject: '', description: '' });
        setShowForm(false);
        fetchRequests();
      } else {
        toast.error(res.data?.message || 'Submission failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-sky-700 dark:text-sky-400">
            My Mentorship Requests
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded transition"
          >
            Add New Request
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No mentorship requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li
                key={req._id}
                className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {req.subject}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{req.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Status: <span className="capitalize">{req.status || 'Pending'}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 w-full max-w-xl mx-4 shadow-xl relative"
            >
              <h2 className="text-2xl font-semibold text-center text-sky-700 dark:text-sky-400 mb-6">
                Request Mentorship
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* subject */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Career guidance in AI"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    placeholder="Describe your mentorship needs in detail..."
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white px-6 py-3 rounded transition duration-200"
                  >
                    {uploading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestMentorship;
