import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  register: async (userData) => {
    const payload = {
      ...userData,
      role: userData.userType ? userData.userType.toUpperCase() : 'DONOR'
    };
    return await api.post('/auth/register', payload);
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export const hospitalService = {
  getAll: async () => {
    const response = await api.get('/hospitals');
    return response.data;
  }
};

export const requestService = {
  getAll: async () => {
    const response = await api.get('/requests');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/requests', data);
    return response.data;
  }
};

export default api;
