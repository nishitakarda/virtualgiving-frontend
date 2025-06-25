import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { MdEmail, MdPhone } from "react-icons/md";

const ManageDonations = () => {
  const [pendingDonations, setPendingDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only pending Donations
  useEffect(() => {
    const fetchPendingDonations = async () => {
      try {
        const response = await axiosInstance.get("/admin/pending-donations");
        setPendingDonations(response.data);
      } catch (error) {
        console.error("Error fetching pending Donations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingDonations();
  }, []);

  const handleApprove = async (donationId) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/admin/update-donation-status`, { donationRequestId:donationId, status: 'APPROVED' });
      setPendingDonations((prev) => prev.filter((u) => u.id !== donationId));
      toast.success("Updated Successfully")
    } catch (err) {
      toast.error(err.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (donationId) => {
    try {
      setLoading(true);
      await axiosInstance.post(`/admin/update-donation-status`, { donationRequestId: donationId, status: 'REJECT' });
      setPendingDonations((prev) => prev.filter((u) => u.id !== donationId));
      toast.success("Updated Successfully")
    } catch (err) {
      toast.error(err.data?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading Donations...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Pending Donations</h2>
      {pendingDonations.length === 0 ? (
        <p className="text-center text-gray-600">No pending Donations.</p>
      ) : (
        <ul className="space-y-4">
          {pendingDonations.map((donation) => (
            <li
              key={donation.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium text-lg">{donation.title}</p>
                  <p className="text-sm text-gray-500">{donation.description}</p>
                  <p className="text-sm text-gray-500"><MdEmail color="black" className="inline mr-2" />{donation.email}</p>
                  <p className="text-sm text-gray-500"><MdPhone color="black" className="inline mr-2" />{donation.phone}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(donation.id)}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(donation.id)}
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

export default ManageDonations;
