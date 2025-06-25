import { useState } from 'react';

const RequestMentorship = ({ handleCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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

    // Simulate upload/store
    const existingRequests = JSON.parse(localStorage.getItem("mentorshipRequests")) || [];
    localStorage.setItem("mentorshipRequests", JSON.stringify([...existingRequests, formData]));

    alert("Mentorship request submitted!");

    setFormData({ title: '', description: '' });
    setUploading(false);
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg overflow-y-auto max-h-[calc(100vh-8rem)]">
        <h2 className="text-3xl font-semibold text-sky-700 dark:text-sky-400 mb-6 text-center">
          Request Mentorship
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
              Subject
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
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

          {/* Buttons */}
          <div className="flex items-center justify-end gap-8 mt-6">
            <button
              type="button"
              onClick={handleCancel}
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
      </div>
    </div>
  );
};

export default RequestMentorship;
