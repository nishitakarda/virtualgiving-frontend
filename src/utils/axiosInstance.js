import axios from 'axios';
import { store } from '../redux/store';

const axiosInstance = axios.create({
  baseURL: 'https://virtualgiving-backend.onrender.com/api',// 'http://localhost:8080/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;