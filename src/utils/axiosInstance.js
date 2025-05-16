import axios from 'axios';
import { store } from '../redux/store'; 
import { loginSuccess, logout } from '../redux/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
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

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const res = await axios.post('http://localhost:8080/refresh-token', {}, { withCredentials: true });
        const newToken = res.data.token;
        store.dispatch(loginSuccess({ token: newToken, userType: store.getState().auth.userType }));
        err.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(err.config);
      } catch (refreshErr) {
        store.dispatch(logout());
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
