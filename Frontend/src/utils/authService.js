import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/'; // Update with your actual backend URL

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
  // Implement other necessary methods
};
