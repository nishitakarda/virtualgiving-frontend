import React, { useState } from 'react';

export default function StudentProfile() {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    college: '',
    email: '',
    phone: '',
    location: '',
    birthdate: '',
    gender: '',
    linkedin: '',
    github: '',
    skills: [],
    resume: null,
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillAdd = () => {
    if (form.newSkill && !form.skills.includes(form.newSkill)) {
      setForm({ ...form, skills: [...form.skills, form.newSkill], newSkill: '' });
    }
  };

  const handleResumeUpload = (e) => {
    setForm({ ...form, resume: e.target.files[0] });
  };

  const handleImageUpload = (e) => {
    setForm({ ...form, profileImage: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <div className="w-full mx-auto p-6 text-black bg-white dark:text-white dark:bg-gray-900">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-40 h-40">
          <img
            src={form.profileImage || '/default-profile.png'}
            className="rounded-full object-cover w-full h-full border border-gray-300 dark:border-gray-600"
            alt="profile"
          />
          {editMode && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 text-xs rounded-full">📷</div>
            </>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{form.fullName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{form.college}</p>
        </div>
      </div>

      {!editMode ? (
        <div className="grid grid-cols-2 gap-4 text-lg">
          <ProfileRow label="Email" value={form.email} />
          <ProfileRow label="Phone" value={form.phone} />
          <ProfileRow label="Gender" value={form.gender || 'Not Provided'} />
          <ProfileRow label="Birthdate" value={form.birthdate || 'Not Provided'} />
          <ProfileRow label="Location" value={form.location || 'Not Provided'} />
          <ProfileRow label="LinkedIn" value={form.linkedin || 'Not Provided'} isLink />
          <ProfileRow label="GitHub" value={form.github || 'Not Provided'} isLink />
          <div className="col-span-2">
            <label className="font-medium">Key Skills:</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {form.skills.map((skill, index) => (
                <span key={index} className="bg-black text-white px-3 py-1 rounded-full text-xs dark:bg-white dark:text-black">{skill}</span>
              ))}
            </div>
          </div>
          <ProfileRow label="Resume" value={form.resume?.name || 'Not Uploaded'} />
          <div className="col-span-2 text-right">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 px-4 py-2 rounded cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form className="grid grid-cols-2 gap-4 text-md">
          <InputField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <InputField label="College" name="college" value={form.college} onChange={handleChange} />
          <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
          <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <InputField label="Location" name="location" value={form.location} onChange={handleChange} />
          <InputField label="Birthdate" name="birthdate" type="date" value={form.birthdate} onChange={handleChange} />

          <div className="flex flex-col">
            <label className="font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>

          <InputField label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
          <InputField label="GitHub" name="github" value={form.github} onChange={handleChange} />

          <div className="col-span-2">
            <label className="font-medium">Key Skills</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={form.newSkill || ''}
                onChange={(e) => setForm({ ...form, newSkill: e.target.value })}
                placeholder="Add skill"
                className="bg-white text-black dark:bg-gray-800 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600 w-full"
              />
              <button type="button" onClick={handleSkillAdd} className="bg-blue-600 px-4 rounded">
                Add
              </button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.skills.map((skill, idx) => (
                <span key={idx} className="bg-blue-700 px-3 py-1 rounded-full text-xs">{skill}</span>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Resume: </label>
            <input
              type="file"
              onChange={handleResumeUpload}
              className="mt-1 text-sm text-black dark:text-white"
            />
            {form.resume?.name && <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{form.resume.name}</p>}
          </div>

          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-600 px-4 py-2 rounded"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-white text-black dark:bg-gray-800 dark:text-white p-2 rounded border border-gray-300 dark:border-gray-600"
      />
    </div>
  );
}

function ProfileRow({ label, value, isLink }) {
  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 text-md">{label}</p>
      {isLink && value !== 'Not Provided' ? (
        <a href={value} target="_blank" className="text-blue-600 dark:text-blue-400 underline">{value}</a>
      ) : (
        <p className={value === 'Not Provided' ? "text-gray-400 italic dark:text-gray-500" : "text-black dark:text-white"}>
          {value}
        </p>
      )}
    </div>
  );
}
