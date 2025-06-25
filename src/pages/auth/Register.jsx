import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from '../../utils/axiosInstance';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';

const roleOptions = [
  { label: 'Student', value: 'STUDENT', icon: <FaUserGraduate /> },
  { label: 'Alumni', value: 'ALUMNI', icon: <FaUserTie /> },
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('STUDENT');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    graduationYear: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Must be exactly 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 characters';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.graduationYear.trim()) newErrors.graduationYear = 'Graduation year is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        '/auth/signup',
        { ...formData, role },
        { withCredentials: true }
      );

      const { token, email, role: userRole } = response.data;
      if (!token || !userRole) throw new Error('Invalid signup response');

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', userRole);

      const route = userRole?.toUpperCase();
      if (route === 'STUDENT') navigate('/student-dashboard');
      else if (route === 'ALUMNI') navigate('/alumni-dashboard');
      else toast.error('Invalid role detected');
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-6 z-50">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800/80 shadow-xl rounded-xl p-6 space-y-6">
          <div className="text-center">
            <img src="/logo2.png" alt="Logo" className="w-24 mx-auto mb-2" />
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Create Account</h1>

            {/* Role Switcher with animation */}
            <div className="flex justify-center gap-4 mt-4">
              {roleOptions.map(({ label, value, icon }) => (
                <button
                  key={value}
                  onClick={() => setRole(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                    role === value
                      ? 'bg-teal-600 text-white border-teal-700 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {role === value && (
                      <motion.span
                        key={value}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {icon}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'name', placeholder: 'Full Name' },
              { name: 'email', type: 'email', placeholder: 'Email Address' },
              { name: 'phone', placeholder: 'Phone Number' },
              { name: 'password', type: 'password', placeholder: 'Password' },
              { name: 'city', placeholder: 'City' },
              { name: 'graduationYear', placeholder: 'Graduation Year' },
            ].map(({ name, type = 'text', placeholder }) => (
              <div key={name}>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  autoComplete={name}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create New Account'}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
