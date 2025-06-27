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
    <div className="px-4 py-10 md:px-16 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-10">
        📅 Post a New Mentorship
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-2xl"
      >
        {/* Topic */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-1">
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            placeholder="e.g. Cracking Coding Interviews"
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            placeholder="Provide details about the mentorship topic, objectives, expectations..."
            className="w-full px-4 py-2 border rounded-lg resize-none bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Max Participants */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-1">
            Max Participants
          </label>
          <input
            type="number"
            name="maxParticipants"
            min="1"
            value={formData.maxParticipants}
            onChange={handleChange}
            required
            placeholder="e.g. 50"
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Registration Deadline */}
        <div>
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-1">
            Registration Deadline
          </label>
          <input
            type="datetime-local"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          {uploading ? 'Posting...' : 'Post Mentorship'}
        </button>
      </form>
    </div>
  );
};

export default PostMentorship;
