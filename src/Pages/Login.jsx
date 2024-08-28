import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { api } from '../Host'; // Import the API instance
import { useUser } from './UserContext'; // Import useUser from UserContext

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { setAdminName } = useUser(); // Get setAdminName from UserContext

  const handleLogin = async () => {
    try {
      const response = await api.post('/admin/login', { email, password }); // Use the api instance
      console.log('Login successful:', response.data);

      // Store token and adminName, and redirect to dashboard
      localStorage.setItem('authToken', response.data.token); // Store the token
      setAdminName(response.data.admin_name); // Set adminName in context
      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Invalid email or password.'); // Set error message
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-[#001F2A] flex items-center justify-center">
        <img src="./login.png" alt="Login" className="h-96 w-96" />
      </div>
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-white p-4 lg:p-8'>
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
            <img src="./logo.png" alt="" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
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
