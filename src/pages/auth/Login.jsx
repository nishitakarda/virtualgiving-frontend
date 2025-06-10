import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from '../../utils/axiosInstance';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
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
    setLoading(true);

    try {
      // check validation
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // post form data
      const response = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password
      }, { withCredentials: true });

      if (response.data.token) {
        const { token, email, role } = response.data;

        // save to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);

        const savedRole = localStorage.getItem('role')?.toUpperCase();

        if (savedRole === 'STUDENT') {
          navigate('/student-dashboard');
        } else if (savedRole === 'ORGANIZATION') {
          navigate('/org-dashboard');
        } else if (savedRole === 'ALUMNI') {
          navigate('/alumni-dashboard');
        } else {
          toast.error('Invalid role detected!');
        }

      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.response?.data?.error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className='absolute top-0 left-0 flex flex-col justify-center w-screen h-screen bg-white dark:bg-gray-900 z-90 text-center p-4'>
        <img src="/logo2.png" className='w-32 mx-auto mb-4' alt="Logo" />
        <p className='text-3xl mb-12'>Login</p>


        <form onSubmit={handleSubmit} className="flex bg-white dark:bg-gray-800/50 shadow-lg rounded-lg flex-col gap-4 overflow-auto mx-auto p-6 w-full max-w-lg">
          {[{ name: 'email', type: 'email', placeholder: 'Enter your email' },
          { name: 'password', type: 'password', placeholder: 'Enter password' },
          ].map(({ name, type, placeholder }) => (
            <div key={name}>
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-lg focus:outline-0"
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

        <p className='mt-4'>Don’t have an account? <Link to={'/register'} className='text-teal-500'>Register</Link></p>
      </div>
    </>

  );
};

export default Login;
