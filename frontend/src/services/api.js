import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// NO AUTO-REDIRECT — let the component handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const travelAPI = {
  create: (data) => api.post('/travel-requests', data),
  getMy: () => api.get('/travel-requests/my'),
  getPending: () => api.get('/travel-requests/pending'),
};