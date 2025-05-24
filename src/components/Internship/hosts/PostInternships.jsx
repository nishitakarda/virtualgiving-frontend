import React, { useState } from 'react';

const PostInternships = () => {
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

    // Save to localStorage
    const existingInternships = JSON.parse(localStorage.getItem("postedInternships")) || [];
    localStorage.setItem("postedInternships", JSON.stringify([...existingInternships, finalData]));

    alert("Internship posted successfully!");

    // Reset form
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
    <div className="flex justify-center mt-8 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[calc(100vh-7rem)]">
        <h1 className="text-2xl font-bold text-sky-700 mb-6">Post Internships</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Internship Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full p-2 border border-gray-300 rounded cursor-pointer bg-white text-sm"
            />
            {logoFile && (
              <img
                src={URL.createObjectURL(logoFile)}
                alt="Logo Preview"
                className="w-20 h-20 mt-2 object-cover rounded border"
              />
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Posted By</label>
            <input
              type="text"
              name="postedBy"
              value={formData.postedBy}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Internship Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border rounded resize-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Backend Engineer">Backend Engineer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Location</option>
              <option value="Remote">Remote</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
              <option value="Indore">Indore</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Salary Range</label>
            <select
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Salary</option>
              <option value="0-10k">0-10k</option>
              <option value="10k-20k">10k-20k</option>
              <option value="20k-30k">20k-30k</option>
              <option value="30k+">30k+</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Duration</option>
              <option value="Less than 2 months">Less than 2 months</option>
              <option value="2 months">2 months</option>
              <option value="3–6 months">3–6 months</option>
              <option value="More than 6 months">More than 6 months</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-black text-white px-6 py-2 rounded-4xl hover:bg-gray-800 transition cursor-pointer"
          >
            {uploading ? 'Uploading...' : 'Post Internship'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostInternships;
