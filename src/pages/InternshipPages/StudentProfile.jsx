import React, { useState } from 'react';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    birthdate: '',
    gender: '',
    education: '',
    keySkills: [],
    project: '',
    summary: '',
    resume: null,
    photo: null,
  });

  const [skillInput, setSkillInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (skillInput && !profile.keySkills.includes(skillInput)) {
      setProfile((prev) => ({
        ...prev,
        keySkills: [...prev.keySkills, skillInput],
      }));
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skill) => {
    setProfile((prev) => ({
      ...prev,
      keySkills: prev.keySkills.filter((s) => s !== skill),
    }));
  };

  const handleResumeUpload = (e) => {
    setProfile((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('student-profile', JSON.stringify(profile));
    alert('Profile saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Student Profile</h2>

      <div className="mb-6">
        <label className="block font-medium mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Photo
              </div>
            )}
          </div>
          <div className="h-24 border-l border-gray-300"></div>
          <label className="text-sm text-gray-700 cursor-pointer">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            <span className="border px-4 py-1 rounded inline-block bg-gray-100 hover:bg-gray-200">
              Choose File
            </span>
            <span className="ml-2 text-gray-500">
              {profile.photo ? 'Photo Selected' : 'No file chosen'}
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} className="border p-2 rounded w-full" placeholder="Full Name" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} className="border p-2 rounded w-full" placeholder="Phone Number" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="border p-2 rounded w-full" placeholder="Email" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input type="text" name="location" value={profile.location} onChange={handleInputChange} className="border p-2 rounded w-full" placeholder="Location" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Birthdate</label>
          <input type="date" name="birthdate" value={profile.birthdate} onChange={handleInputChange} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select name="gender" value={profile.gender} onChange={handleInputChange} className="border p-2 rounded w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Education</label>
        <input type="text" name="education" value={profile.education} onChange={handleInputChange} placeholder="Your Education" className="border p-2 rounded w-full" />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Key Skills</label>
        <div className="flex gap-2 mb-2">
          <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="border p-2 rounded w-full" placeholder="Add a skill" />
          <button onClick={handleSkillAdd} className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.keySkills.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
              {skill}
              <button onClick={() => handleSkillRemove(skill)} className="text-red-500">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Project Details</label>
        <textarea name="project" value={profile.project} onChange={handleInputChange} placeholder="Your Projects" className="border p-2 rounded w-full" rows="3"></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Profile Summary</label>
        <textarea name="summary" value={profile.summary} onChange={handleInputChange} placeholder="Brief Summary About You" className="border p-2 rounded w-full" rows="3"></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-2">Upload Resume</label>
        <div className="flex items-center gap-4">
          <div className="h-8 border-l border-gray-300"></div>
          <label className="text-sm text-gray-700 cursor-pointer">
            <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" />
            <span className="border px-4 py-1 rounded inline-block bg-gray-100 hover:bg-gray-200">
              Choose File
            </span>
            <span className="ml-2 text-gray-500">
              {profile.resume ? profile.resume.name : 'No file chosen'}
            </span>
          </label>
        </div>
      </div>

      <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Save Changes
      </button>
    </div>
  );
};

export default StudentProfile;
