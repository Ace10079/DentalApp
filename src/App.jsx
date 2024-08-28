import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './Pages/Dashboard';
import Table1 from './Pages/Table1';
import Table2 from './Pages/Table2';
import Table3 from './Pages/Table3';
import Table4 from './Pages/Table4';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import PrivateRoute from './Pages/PrivateRoute';
import { UserProvider } from './Pages/UserContext'; // Correct import

export default function App() {
  return (
    <UserProvider> {/* Wrap Routes with UserProvider */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/table1" element={<Table1 />} />
            <Route path="/table2" element={<Table2 />} />
            <Route path="/table3" element={<Table3 />} />
            <Route path="/table4" element={<Table4 />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  );
}
