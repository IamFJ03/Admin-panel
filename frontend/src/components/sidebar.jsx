import React from 'react'
import {LayoutDashboard, User, Settings, Package, ShoppingBag} from 'lucide-react';

export default function sidebar() {
  return (
    <div className='h-screen w-[20%] bg-gray-800 text-white'>
      <p className='text-white flex justify-center text-xl font-semibold my-5'>Admin Panel</p>
      <p className='ml-10 mb-5 text-sm'>Platform</p>
      <ul className='flex flex-col gap-10 ml-10 text-lg font-semibold'>
        <li className='flex items-center gap-2'><LayoutDashboard size={18} color='white' />Dashboard</li>
        <li className='flex items-center gap-2'><User size={20} color='white' />Users</li>
        <li className='flex items-center gap-2'><Package size={20} color='white' />Financial Records</li>
        <li className='flex items-center gap-2'><ShoppingBag size={20} color='white'/>Reports</li>
        <li className='flex items-center gap-2'><Settings size={20} color='white'/>Settings</li>
      </ul>
    </div>
  )
}
