import axios from '../utils/axiosInstance';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import RoleSwitcher from '../components/RoleSwitcher';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let role = '';
      if (activeTab === 1) role = 'STUDENT';
      else if (activeTab === 2) role = 'ORGANIZATION';
      else if (activeTab === 3) role = 'ALUMNI';

      const response = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password
      }, { withCredentials: true });

      if (response.data.token) {
        const token = response.data.token;
        const email = response.data.email;
        const role = response.data.role;

        dispatch(loginSuccess({ token, email, role }));
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);

        
          navigate('/');
        
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
   <div className='absolute top-0 left-0 flex flex-col justify-center w-screen h-screen bg-white dark:bg-gray-900 z-90 text-center p-4'>
         <img src="/logo2.png" className='w-32 mx-auto mb-4' alt="" />
         <p className='text-3xl mb-12'>Login</p>
   
       <RoleSwitcher onChange={(role)=>setRole(role)} />

           
         <form onSubmit={handleSubmit} className="flex  bg-white dark:bg-gray-800/50 shadow-lg rounded-lg flex-col gap-4 overflow-auto mx-auto p-6 w-full max-w-lg">
           {[
             { name: 'email', type: 'email', placeholder: 'Enter your email' },
             { name: 'password', type: 'password', placeholder: 'Enter password' },
             
           ].map(({ name, type = 'text', placeholder }) => (
             <div key={name}>
               <input
                 name={name}
                 type={type}
                 value={formData[name]}
                 onChange={handleChange}
                 placeholder={placeholder}
                 className="w-full px-4 py-3  bg-white dark:bg-gray-800 rounded-lg focus:outline-0"
               />
               {errors[name] && <p className="text-red-500 text-left text-sm mt-1">{errors[name]}</p>}
             </div>
           ))}
   
           <div className="col-span-2">
             <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700">
               Login
             </button>
           </div>
         </form>
   
         <p className='mt-4'>Already have an account? <Link to={'/register'} className='text-teal-500'>Register</Link> </p>
       </div>
  );
};

export default Login;
