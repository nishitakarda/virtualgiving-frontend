import axios from '../utils/axiosInstance';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import RoleSwitcher from '../components/RoleSwitcher';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    street: '',
    city: '',
    state: '',
    role:''
  });

  const [role, setRole] = useState('Student');

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    console.log({name:formData.name, email:formData.email, password:formData.password, role});
    

    // Register user
    const response = await axios.post('/auth/signup', {name:formData.name, email:formData.email, password:formData.password, role}, { withCredentials: true });

    const token = response.data.token;

    if (token) {
      const token = response.data.token;
            const email = response.data.email;
            const role = response.data.role;
            dispatch(loginSuccess({ token, email, role }));
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('role', role);
      navigate('/')
    } else {
      alert('Registration done, but no token received.');
    }

    // Clear form
    setFormData({
      name: '',
      email: '',
      contactNumber: '',
      password: '',
      street: '',
      city: '',
      state: '',
      role:''
    });

  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed! Please try again.');
  }
};

  return (
    <div className='absolute top-0 left-0 flex flex-col justify-center w-screen h-screen bg-white dark:bg-gray-900 z-90 text-center p-4'>
      <img src="/logo2.png" className='w-32 mx-auto mb-4' alt="" />
      <p className='text-3xl mb-12'>Signup</p>

    <RoleSwitcher onChange={(role)=>setRole(role)} />

      <form onSubmit={handleSubmit} className="flex dark:bg-gray-800/50  bg-white shadow-lg rounded-lg flex-col gap-4 overflow-auto mx-auto p-6 w-full max-w-lg">
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
              className="w-full px-4 py-3   dark:bg-gray-800 bg-gray-50 rounded-lg focus:outline-0"
            />
            {errors[name] && <p className="text-red-500 text-left text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="col-span-2">
          <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700">
            Create new account
          </button>
        </div>
      </form>

      <p className='mt-4'>Already have an account? <Link to={'/login'} className='text-teal-500'>Login</Link> </p>
    </div>
  );
};

export default Register;
