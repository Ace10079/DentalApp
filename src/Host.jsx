import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dental-backend-lkp2.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
