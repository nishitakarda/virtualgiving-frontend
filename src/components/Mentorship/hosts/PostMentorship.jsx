import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import LoadingSpinner from '../../LoadingSpinner';

const PostMentorship = () => {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    dateTime: '',
    maxParticipants: '',
    registrationDeadline: '',
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
      const response = await axiosInstance.post('/mentorships/post', formData, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Mentorship Posted Successfully", { position: 'top-center' });
        setFormData({
          topic: '',
          description: '',
          dateTime: '',
          maxParticipants: '',
          registrationDeadline: '',
        });
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  if (uploading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center min-w-3xl mt-8 mx-auto">
      <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md overflow-y-auto">
        <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6">Post Mentorship</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Description</label>
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
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Max Participants</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Registration Deadline</label>
            <input
              type="datetime-local"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            {uploading ? 'Posting...' : 'Post Mentorship'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostMentorship;
