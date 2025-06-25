import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { MdArrowBack } from 'react-icons/md';
import LoadingSpinner from '../../components/LoadingSpinner';
import axiosInstance from '../../utils/axiosInstance';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
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
      newErrors.password = 'Minimum 6 characters required';
    }

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
      const { data } = await axiosInstance.post(
        '/auth/admin-login',
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      const { token, email, role } = data;
      if (!token || role !== 'ADMIN') throw new Error('Invalid admin login response');

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);

      navigate('/admin/users');
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.response?.data || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-6 z-50">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800/80 shadow-xl rounded-xl p-6 space-y-6">
          <div className="text-center">
            <img src="/logo2.png" alt="Logo" className="w-24 mx-auto mb-2" />
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Admin Login</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'email', type: 'email', placeholder: 'Email Address' },
              { name: 'password', type: 'password', placeholder: 'Password' },
            ].map(({ name, type, placeholder }) => (
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
              {loading ? 'Logging in...' : 'Login as Admin'}
            </button>
          </form>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-sm text-center text-gray-600 dark:text-gray-300 flex justify-center items-center gap-1"
          >
            <MdArrowBack className="text-lg" />
            <Link to="/login" className="text-teal-500 hover:underline">
              Back to User Login
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
