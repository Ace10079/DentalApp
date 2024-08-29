import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dental-backend-lkp2.onrender.com', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
