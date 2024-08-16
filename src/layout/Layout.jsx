import React from 'react';
import Sidebar from '../Pages/Sidebar';
import Header from '../Pages/Header';
import Cards from '../Pages/Cards';
import Dashboard from '../Pages/Dashboard';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout;
