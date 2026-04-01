import React from 'react';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
