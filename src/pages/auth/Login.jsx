import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from '../../utils/axiosInstance';
import { MdPerson2 } from 'react-icons/md';

const Login = () => {
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
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const { data } = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      }, { withCredentials: true });

      const { token, email, role, message } = data;

      if (!token || !role) {
        throw new Error(message || 'Invalid login response');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);

      const path = role?.toUpperCase();
      if (path === 'STUDENT') navigate('/student-dashboard');
      else if (path === 'ORGANIZATION') navigate('/org-dashboard');
      else if (path === 'ALUMNI') navigate('/alumni-dashboard');
      else toast.error('Invalid user role detected!');
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.response?.data || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-white dark:bg-gray-900 px-4 py-6 text-center z-50">
        <img src="/logo2.png" alt="Logo" className="w-24 sm:w-32 mb-6" />
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-gray-800/80 rounded-xl shadow-lg p-6 flex flex-col gap-4"
        >
          {[
            { name: 'email', type: 'email', placeholder: 'Enter your email' },
            { name: 'password', type: 'password', placeholder: 'Enter password' },
          ].map(({ name, type, placeholder }) => (
            <div key={name} className="text-left">
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete={name}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            Don’t have an account?{' '}
            <Link to="/register" className="text-teal-500 hover:underline">
              Register
            </Link>
          </p>

          <Link to="/admin-login" className="text-sm text-red-500 hover:underline">
            Admin Login?
          </Link>

          <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
