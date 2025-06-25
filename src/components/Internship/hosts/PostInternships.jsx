import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import LoadingSpinner from '../../LoadingSpinner';

import { MdWork, MdLocationOn, MdAttachMoney, MdAccessTime } from 'react-icons/md';
import { FaBuilding } from 'react-icons/fa';
import { BiText } from 'react-icons/bi';

const PostInternships = () => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    salary: '',
    durationMonths: '',
  });

  const [uploading, setUploading] = useState(false);

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
      const response = await axiosInstance.post('/internships/post', formData, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Posted Successfully", { position: 'top-center' });
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
      setFormData({
        title: '',
        companyName: '',
        description: '',
        location: '',
        salary: '',
        durationMonths: '',
      });
    }
  };

  if (uploading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-20 py-10 bg-gray-100 dark:bg-gray-900 ">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="text-xl sm:text-3xl font-bold text-center text-sky-700 dark:text-sky-400 mb-8">
          Post a New Internship
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-1">
              <MdWork /> Internship Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Company */}
          <div>
            <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-1">
              <FaBuilding /> Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-1">
              <BiText /> Internship Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-lg resize-none bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-1">
              <MdLocationOn /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-1">
              <MdAttachMoney /> Salary Range
            </label>
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Salary</option>
              <option value="Unpaid">Unpaid</option>
              <option value="0k-10k">0k-10k</option>
              <option value="10k-20k">10k-20k</option>
              <option value="20k-30k">20k-30k</option>
              <option value="30k+">30k+</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-1">
              <MdAccessTime /> Duration
            </label>
            <select
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Duration</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
              <option value="4 months">4 months</option>
              <option value="5 months">5 months</option>
              <option value="6 months">6 months</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 shadow-md transition"
          >
            {uploading ? 'Posting...' : 'Post Internship'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInternships;
