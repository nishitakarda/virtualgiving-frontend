import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const userType = activeTab === 1 ? 'Student' : activeTab === 2 ? 'Organization' : 'Alumni';
      console.log('Login as:', userType);
      console.log('Login Data:', formData);
      
    }
  };

  return (
    <div className='absolute top-0 left-0 flex flex-col items-center w-screen h-screen bg-white z-20'>
      <p className='text-3xl m-12'>Login</p>

      <div className='flex justify-between w-md items-center'>
        <button onClick={() => setActiveTab(1)} className={`border-gray-200 bg-gray-50 opacity-75 rounded-t-xl p-2 grow ${activeTab === 1 ? "border border-b-0 translate-y-0.5 px-8 bg-white opacity-100" : ""}`}>
          Student
        </button>
        <button onClick={() => setActiveTab(2)} className={`border-gray-200 bg-gray-50 opacity-75 rounded-t-xl p-2 grow ${activeTab === 2 ? "border translate-y-0.5 px-8 border-b-0 bg-white opacity-100" : ""}`}>
          Organization
        </button>
        <button onClick={() => setActiveTab(3)} className={`border-gray-200 bg-gray-50 opacity-75 rounded-t-xl p-2 grow ${activeTab === 3 ? "border translate-y-0.5 px-8 border-b-0 bg-white opacity-100" : ""}`}>
          Alumni
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex border border-gray-200 bg-white shadow-lg rounded-b-lg flex-col gap-4 overflow-auto min-w-md p-6">
        {[
          { name: 'email', type: 'email', placeholder: 'Enter your email' },
          { name: 'password', type: 'password', placeholder: 'Enter your password' }
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            <input
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-0"
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" className="w-full bg-sky-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>

      <p className='mt-4'>Don't have an account? <Link to={'/register'} className='text-blue-500'>Register</Link> </p>
    </div>
  );
};

export default Login;
