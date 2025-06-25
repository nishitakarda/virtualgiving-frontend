import axios from 'axios';
import { store } from '../redux/store';
import { navigate } from './navigationHelper'; 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', //'https://virtualgiving-backend.onrender.com/api'
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to catch 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');

      // Navigate to login
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;