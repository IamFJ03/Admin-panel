import React from 'react';
import Login from './pages/auth/Login';
import Signup from './pages/auth/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
