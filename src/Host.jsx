import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://15.207.18.188:3000', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});
