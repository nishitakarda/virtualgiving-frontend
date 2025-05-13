import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    street: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
      // Proceed with API call or form submission
    }
  };

  return (
    <div className='absolute top-0 left-0 flex flex-col items-center w-screen h-screen bg-white z-20'>
      <p className='text-3xl m-12'>Registration</p>

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
          { name: 'name', placeholder: 'Enter your name' },
          { name: 'email', type: 'email', placeholder: 'Enter your email' },
          { name: 'contactNumber', placeholder: 'Enter contact number' },
          { name: 'password', type: 'password', placeholder: 'Enter password' },
          { name: 'street', placeholder: 'Enter street' },
          { name: 'city', placeholder: 'Enter city' },
          { name: 'state', placeholder: 'Enter state' }
        ].map(({ name, type = 'text', placeholder }) => (
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

        <div className="col-span-2">
          <button type="submit" className="w-full bg-sky-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Create new account
          </button>
        </div>
      </form>

      <p className='mt-4'>Already have an account? <Link to={'/login'} className='text-blue-500'>Login</Link> </p>
    </div>
  );
};

export default Register;
