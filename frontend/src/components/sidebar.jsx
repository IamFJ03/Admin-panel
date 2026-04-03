import React from 'react'
import { LayoutDashboard, User, Settings, Wallet, FileText, LogOut } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function sidebar({ role }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = await localStorage.getItem('token');
    const res = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });
    const data = await res.json();
    if (data.message === "Logout Successfull") {
      navigate('/login');
    }

  }
  return (
    <div className='h-screen w-[20%] bg-gray-800 text-white flex flex-col justify-between'>
      <div>
        {
          role === "admin"
            ?
            <p className='text-white flex justify-center text-xl font-semibold my-5'>
              Admin Panel
            </p>
            :
            <p className='text-white flex justify-center text-xl font-semibold my-5'>
              User Dashboard
            </p>
        }
        <p className='ml-10 mb-5 text-sm'>Platform</p>
        <ul className='flex flex-col gap-5  mx-2 text-lg font-semibold'>
          {
            role === "admin"
              ?
              <>
                <li className='flex items-center gap-2'><LayoutDashboard size={18} color='white' />Dashboard</li>
                <li className='flex items-center gap-2'><User size={20} color='white' />Users</li>
                <li className='flex items-center gap-2'><Wallet size={20} color='white' />Financial Records</li>
                <li className='flex items-center gap-2'><FileText size={20} color='white' />Reports</li>
                <li className='flex items-center gap-2'><Settings size={20} color='white' />Settings</li>
              </>
              :
              <>
                <NavLink to={"/admin-dashboard"} className={({isActive}) => `flex items-center gap-2 hover:bg-blue-900 px-7 py-2 w-full rounded transition-all duration-500 ${isActive ? 'bg-blue-900' : ""}`}><LayoutDashboard size={18} color='white' />Dashboard</NavLink>
                <NavLink to={"/user/records"} className={({isActive}) => `flex items-center gap-2 hover:bg-blue-900 px-7 py-2 w-full rounded transition-all duration-500 ${isActive ? 'bg-blue-900' : ""}`}><User size={20} color='white' />My Records</NavLink>
                <NavLink to={"/user/add-records"} className={({isActive}) => `flex items-center gap-2 hover:bg-blue-900 px-7 py-2 w-full rounded transition-all duration-500 ${isActive ? 'bg-blue-900' : ""}`}><Wallet size={20} color='white' />Add Records</NavLink>
                <li className='flex items-center gap-2 px-5 py-3 hover:bg-blue-900 transition-all duration-500'><FileText size={20} color='white' />My Reports</li>
                <li className='flex items-center gap-2 px-5 py-3 hover:bg-blue-900 transition-all duration-500'><Settings size={20} color='white' />Settings</li>
              </>
          }
        </ul>
      </div>
      <div className='flex items-center ml-10 gap-2 mb-10 cursor-pointer'>
        <LogOut size={20} color='white' />
        <p className='text-lg font-semibold' onClick={handleLogout}>Logout</p>
      </div>
    </div>
  )
}
