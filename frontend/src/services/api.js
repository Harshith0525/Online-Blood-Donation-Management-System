import axios from 'axios';

// Point to your live Render backend for production, but allow local overrides via .env
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

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
  },
  getNotifications: async (donorId, bloodGroup) => {
    const response = await api.get(`/requests/notifications/${donorId}/${bloodGroup}`);
    return response.data;
  },
  updateStatus: async (requestId, status) => {
    const response = await api.put(`/requests/${requestId}/status`, status);
    return response.data;
  }
};
 
export const appointmentService = {
  create: async (data) => {
    const response = await api.post('/appointments', data);
    return response.data;
  },
  getForDonor: async (donorId) => {
    const response = await api.get(`/appointments/donor/${donorId}`);
    return response.data;
  }
};
 
export default api;
