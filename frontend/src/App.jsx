import React from 'react';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Records from './pages/user/MyRecords';
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/user/records' element={<Records />} />
      </Routes>
    </BrowserRouter>
  )
}
