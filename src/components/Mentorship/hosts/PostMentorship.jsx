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
      const response = await axiosInstance.post('/mentorships/post', formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Mentorship Posted Successfully', { position: 'top-center' });
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
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-400 mb-6 text-center">
          📅 Post Mentorship
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Topic */}
          <div>
            <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 border rounded-md resize-none bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Max Participants */}
          <div>
            <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
              Max Participants
            </label>
            <input
              type="number"
              name="maxParticipants"
              min="1"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
              Registration Deadline
            </label>
            <input
              type="datetime-local"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 w-full hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {uploading ? 'Posting...' : 'Post Mentorship'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostMentorship;
