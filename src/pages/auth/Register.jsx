import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import RoleSwitcher from '../../components/theme/RoleSwitcher';
import axios from '../../utils/axiosInstance';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    graduationYear: ''
  });

  const [role, setRole] = useState('STUDENT');
  const [errors, setErrors] = useState({});
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
    if (!formData.phone) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Contact number must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.graduationYear.trim()) newErrors.graduationYear = 'graduationYear is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false)
      return;
    }

    try {

      const response = await axios.post('/auth/signup', { ...formData, role }, { withCredentials: true });

      if (response.data.token) {
        const { token, email, role } = response.data;

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
          alert('Invalid role detected!');
        }
      } else {
        alert('Registration failed');
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        graduationYear: ''
      });

    } catch (error) {
      toast.error('Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className='absolute top-0 left-0 flex flex-col justify-center w-screen h-screen bg-white dark:bg-gray-900 z-90 text-center p-4'>
        <img src="/logo2.png" className='w-24 md:w-32 mx-auto mb-4' alt="Logo" />
        <p className='text-3xl mb-12'>Signup</p>

        <RoleSwitcher onChange={(role) => setRole(role)} />

        <form onSubmit={handleSubmit} className="flex dark:bg-gray-800/50 bg-white shadow-lg rounded-lg flex-col gap-4 overflow-auto mx-auto p-6 w-full max-w-lg">
          {[
            { name: 'name', placeholder: 'Enter your name' },
            { name: 'email', type: 'email', placeholder: 'Enter your email' },
            { name: 'phone', placeholder: 'Enter contact number' },
            { name: 'password', type: 'password', placeholder: 'Enter password' },
            { name: 'city', placeholder: 'Enter city' },
            { name: 'graduationYear', placeholder: 'Enter graduationYear' }
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
    </>
  );
};

export default Register;
