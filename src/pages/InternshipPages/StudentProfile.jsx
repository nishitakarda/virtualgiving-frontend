import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';
import { MdAccountCircle, MdEmail, MdLocationPin, MdPhone } from 'react-icons/md';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    fullName: 'Shivansh Agrawal',
    phone: '8839723582',
    email: 'shivanshagrawal137@gmail.com',
    location: 'Indore',
    birthdate: '',
    gender: '',
    education: 'B.Tech in Electronics & Telecommunication',
    keySkills: [],
    project: '',
    summary: '',
    resume: null,
    photo: '/shivansh.jpg',
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
    <div className='p-8 flex gap-8 grow'>

      <div className='flex flex-col gap-8'>
        <div className='bg-white dark:bg-gray-900  relative shadow-lg rounded-xl w-fit'>
          <div className='h-48 bg-gray-200 dark:bg-gray-700 w-full rounded-t-xl'></div>
          <div className="w-42 h-42 z-30 ml-8 -translate-y-[50%] rounded-full overflow-hidden border-4 border-white dark:border-gray-900  shadow-sm ">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-sm">
                No Photo
              </div>
            )}
          </div>
          <div className='px-8  pt-0 -translate-y-16'>

            <div className='flex  items-center gap-2 mb-2'>
              <span className="text-3xl font-semibold">{profile.fullName || "Student Name"}</span>
              <span className='text-xs px-2 py-1 bg-sky-200 text-sky-900 dark:bg-sky-900 dark:text-sky-200 rounded-full' >Student</span>
            </div>
            <p className='text-gray-400 italic'>Indore, Madhya Pradesh, India</p>

            <div className='flex flex-wrap gap-8 py-4'>
              <p > <MdEmail className='inline' /> {profile.email || "email@example.com"}</p>
              <p ><MdPhone className='inline' /> {profile.phone || "email@example.com"}</p>
              <p ><FaLinkedin className='inline' /> {profile.linkedin || "email@example.com"}</p>
              <p ><FaGithub className='inline' /> {profile.github || "github.com/Shivansh137"}</p>
            </div>

            <hr className=' text-gray-300' />

            <div className='flex justify-between items-center pt-8'>
              <p className='font-bold text-lg'>B.Tech in Electronics & Telecommunication</p>
              <p className='text-sm'>2022-26</p>
            </div>
            <p className=' italic text-sm'>Shri Govindram Seksaria Institute of Technology & Science, Indore</p>
          </div>
        </div>
        <div className='grow bg-gray-200 dark:bg-gray-700/50 rounded-lg'>

        </div>
      </div>

      <div className='grow bg-gray-200 dark:bg-gray-700/50 rounded-lg'>
      </div>
    </div>
  );
};

export default StudentProfile;
