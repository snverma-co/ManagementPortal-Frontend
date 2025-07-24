import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Client API calls
export const clientAPI = {
  getAll: () => API.get('/clients'),
  getById: (id) => API.get(`/clients/${id}`),
  create: (data) => API.post('/clients', data),
  update: (id, data) => API.put(`/clients/${id}`, data),
  delete: (id) => API.delete(`/clients/${id}`)
};

// Task API calls
export const taskAPI = {
  getAll: () => API.get('/tasks'),
  getById: (id) => API.get(`/tasks/${id}`),
  create: (data) => API.post('/tasks', data),
  update: (id, data) => API.put(`/tasks/${id}`, data),
  delete: (id) => API.delete(`/tasks/${id}`)
};

// Document API calls
export const documentAPI = {
  getAll: () => API.get('/documents'),
  getById: (id) => API.get(`/documents/${id}`),
  upload: (formData) => API.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  download: (id) => API.get(`/documents/download/${id}`, { responseType: 'blob' }),
  delete: (id) => API.delete(`/documents/${id}`)
};

export default API;