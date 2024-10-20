import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditBankAccount from './pages/updateBank/updateBank'; 
import AddBank from './pages/addBank/addBank';
import RemoveBankAccount from './pages/deleteBank/deleteBank';
import UserLogin from './userr'; 
import AdminLogin from './admin';
import ViewBankAccounts from './pages/allBank/displayBank';
import Dashboard from './pages/dashboard/userDashboard';
import ListUsers from './pages/admin/ListUser';
import SearchFilter from './pages/admin/search';
import AdminDashboard from './pages/admin/adminDashboard';
function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login/bank/add" element={<AddBank />} />
          <Route path="/login/bank/view" element={<ViewBankAccounts />} />
          <Route path="/login/bank/edit" element={<EditBankAccount />} />
          <Route path="/login/bank/remove" element={<RemoveBankAccount />} />

          {/* Fallback route for 404 pages */}


          {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ListUsers />} />
        <Route path="/admin/search" element={<SearchFilter />} />
        </Routes>
      </div>
  );
}

export default App;
