import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { MdEmail, MdPhone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner";

const ManageDonations = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingDonations = async () => {
    try {
      const response = await axiosInstance.get("/admin/pending-donations");
      setPendingDonations(response.data);
    } catch (error) {
      console.error("Error fetching pending donations:", error);
      toast.error("Failed to load pending donations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDonations();
  }, []);

  const handleStatusUpdate = async (donationId, status) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/admin/update-donation-status`, {
        donationRequestId: donationId,
        status,
      });
      setPendingDonations((prev) => prev.filter((d) => d.id !== donationId));
      toast.success(`Donation ${status.toLowerCase()}ed successfully`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Pending Donation Requests
      </h2>

      {pendingDonations.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-lg">
          🎉 No pending donations!
        </div>
      ) : (
        <ul className="space-y-6">
          <AnimatePresence>
            {pendingDonations.map((donation) => (
              <motion.li
                key={donation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md"
              >
                {/* Content */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {donation.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {donation.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <MdEmail className="text-blue-500" /> {donation.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <MdPhone className="text-green-500" /> {donation.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <button
                      onClick={() => handleStatusUpdate(donation.id, "APPROVED")}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(donation.id, "REJECT")}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition font-medium"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default ManageDonations;
