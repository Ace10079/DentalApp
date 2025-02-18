import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Host';
import { useUser } from './UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setAdminName } = useUser();

  const handleLogin = async () => {
    try {
      const response = await api.post('/admin/login', { email, password });

      if (!response.data || !response.data.token) {
        throw new Error('Invalid response from server');
      }
      console.log("API Response:", response.data);


      // Store credentials in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('adminId', response.data.admin_id);
      localStorage.setItem('adminName', response.data.admin_name);
      localStorage.setItem('adminEmail', response.data.email);

      // Update context
      setAdminName(response.data.admin_name);

      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-[#001F2A] flex items-center justify-center">
        <img src="./login.png" alt="Login" className="h-96 w-96" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 lg:p-8">
        <div className="w-full max-w-sm">
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded-md">
              {success}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded-md">
              {error}
            </div>
          )}
          <div className="mb-4">
            <img src="./logo.png" alt="Logo" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#001F2A] text-white px-4 py-2 rounded-full hover:bg-[#003d4d]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
