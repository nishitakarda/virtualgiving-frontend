import { useState } from 'react';

const RequestMentorship = ({handleCancel}) => {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    postedBy: '',
    description: '',
    category: '',
    location: '',
    type: '',
    salary: '',
    duration: '',
    logoUrl: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logoUrl = logoFile ? URL.createObjectURL(logoFile) : '';
    const finalData = { ...formData, logoUrl };

    const existingInternships = JSON.parse(localStorage.getItem("postedInternships")) || [];
    localStorage.setItem("postedInternships", JSON.stringify([...existingInternships, finalData]));

    alert("Internship posted successfully!");

    setFormData({
      title: '',
      companyName: '',
      postedBy: '',
      description: '',
      category: '',
      location: '',
      type: '',
      salary: '',
      duration: '',
      logoUrl: '',
    });
    setLogoFile(null);
  };

  return (
    <div className="flex  mt-8 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-7rem)]">
        <h1 className="text-2xl font-bold text-sky-700 dark:text-sky-400 mb-6">Request Mentorship</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200">Subject</label>
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
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-200"> Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border rounded resize-none bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
          </div>


          <button
            type="submit"
            disabled={uploading}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-800 transition"
          >
            {uploading ? 'Uploading...' : 'Submit Request'}
          </button>
          <button className='ml-8' onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default RequestMentorship;
