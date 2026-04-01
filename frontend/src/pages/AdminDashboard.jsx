import React from 'react'
import Sidebar from '../components/sidebar'
import { useLocation } from 'react-router-dom'
import { DollarSign, Headphones, Package, User } from 'lucide-react';
export default function AdminDashboard() {
  const location = useLocation();
  const name = location.state?.name;
  return (
    <div className='flex'>
      <Sidebar />
      <div className='m-5 flex-3'>
        <p className='text-xl font-semibold'>Welcome, {name}!</p>
        <p className='border-b border-gray-400 pb-2 mb-2'>Here's your dashboard overview</p>
        <div className='flex gap-5 mt-5 text-white'>
          <div className='flex items-center gap-5 flex-1 bg-blue-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <User size={35} color='white' />
            <div>
              <p>Total Users</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
          <div className='flex flex-1 gap-5 items-center bg-green-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <Package size={35} color='white' />
            <div>
              <p>Total Orders</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
          <div className=' flex flex-1 gap-5 items-center bg-orange-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <DollarSign size={35} color='white' />
            <div>
              <p>Revenue Today</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
          <div className='flex flex-2 items-center gap-5 bg-purple-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <Headphones size={35} color='white' />
            <div>
              <p>Support Tickets</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
        </div>
        <div className='flex gap-5 h-[55%] mt-[5%]'>
          <div className='flex-1 border rounded'></div>
          <div className='flex-1 border rounded'>
            <div></div>
          <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
