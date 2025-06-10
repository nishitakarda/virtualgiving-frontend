import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import LoadingSpinner from '../../LoadingSpinner';

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
      console.log(formData);

      const response = await axiosInstance.post('/internships/post', formData, { withCredentials: true });
      if (response.status == 200) {
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

  if (uploading) return <LoadingSpinner />
  else return (
    <div className="flex justify-center min-w-3xl mt-8 mx-auto">
      <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md overflow-y-auto">
        <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6">Post Internships</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Internship Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>




          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Internship Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border rounded resize-none bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>



          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Salary Range</label>
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Salary</option>
              <option value="0-10k">Unpaid</option>
              <option value="10k-20k">0k-10k</option>
              <option value="10k-20k">10k-20k</option>
              <option value="20k-30k">20k-30k</option>
              <option value="30k+">30k+</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Duration</label>
            <select
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="">Select Duration</option>
              <option value="Less than 2 months">1 month</option>
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
            className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            {uploading ? 'Uploading...' : 'Post Internship'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInternships;
