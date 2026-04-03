import React from 'react'
import { LayoutDashboard, User, Settings, Wallet, FileText, LogOut } from 'lucide-react';
import { useNavigate,Link } from 'react-router-dom';

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
        <ul className='flex flex-col gap-10 ml-10 text-lg font-semibold'>
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
                <li className='flex items-center gap-2'><LayoutDashboard size={18} color='white' /><Link to={"/admin-dashboard"}>Dashboard</Link></li>
                <li className='flex items-center gap-2'><User size={20} color='white' />My Records</li>
                <li className='flex items-center gap-2'><Wallet size={20} color='white' /><Link to={"/user/records"}>Add Records</Link></li>
                <li className='flex items-center gap-2'><FileText size={20} color='white' />My Reports</li>
                <li className='flex items-center gap-2'><Settings size={20} color='white' />Settings</li>
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
