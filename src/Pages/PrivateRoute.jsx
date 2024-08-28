import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken'); // Get token from local storage

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
