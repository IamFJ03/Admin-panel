import React from 'react';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UserRecords from './pages/user/UserRecords';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Records from './pages/user/AddRecords';
import Settings from './pages/user/Settings';
import MyReports from './pages/user/MyReports';
import AllUser from './pages/admin/AllUser';
import AdminRecords from './pages/admin/Records';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/user/add-records' element={<Records />} />
        <Route path='/user/records' element={<UserRecords />} />
        <Route path='/setting' element={<Settings />} />
        <Route path='/user/my-reports' element={<MyReports />} />
        <Route path='/admin/users' element={<AllUser />} />
        <Route path='/admin/records' element={<AdminRecords />} />
      </Routes>
    </BrowserRouter>
  )
}
