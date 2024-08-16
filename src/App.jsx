import React from 'react';
import Layout from './Layout/layout';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Table1 from './Pages/Table1';
import Table2 from './Pages/Table2';
import Table3 from './Pages/Table3';
import Table4 from './Pages/Table4';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/table1" element={<Table1/>} />
        <Route path="/table2" element={<Table2/>} />
        <Route path="/table3" element={<Table3/>} />
        <Route path="/table4" element={<Table4/>} />
      </Route>
    </Routes>
  );
}
