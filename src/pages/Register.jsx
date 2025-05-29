import axios from '../utils/axiosInstance';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    state: ''
  });

  const [role, setRole] = useState('STUDENT');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
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
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role
      };

      const response = await axios.post('/auth/signup', payload, { withCredentials: true });

      const token = response.data.token;
      if (token) {
        const { email, role } = response.data;
        dispatch(loginSuccess({ token, email, role }));
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);

        navigate('/login');
      } else {
        alert('Registration done, but no token received.');
      }

      setFormData({
        name: '',
        email: '',
        contactNumber: '',
        password: '',
        street: '',
        city: '',
        state: ''
      });

    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed! Please try again.');
    }
  };

  return (
    <div className='absolute top-0 left-0 flex flex-col justify-center w-screen h-screen bg-white dark:bg-gray-900 z-90 text-center p-4'>
      <img src="/logo2.png" className='w-32 mx-auto mb-4' alt="Logo" />
      <p className='text-3xl mb-12'>Signup</p>

      <RoleSwitcher onChange={(role) => setRole(role)} />

      <form onSubmit={handleSubmit} className="flex dark:bg-gray-800/50 bg-white shadow-lg rounded-lg flex-col gap-4 overflow-auto mx-auto p-6 w-full max-w-lg">
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
              className="w-full px-4 py-3 dark:bg-gray-800 bg-gray-50 rounded-lg focus:outline-0"
            />
            {errors[name] && <p className="text-red-500 text-left text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700">
          Create new account
        </button>
      </form>

      <p className='mt-4'>Already have an account? <Link to={'/login'} className='text-teal-500'>Login</Link></p>
    </div>
  );
};

export default Register;
