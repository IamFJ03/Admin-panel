import React from 'react'
import Sidebar from '../components/sidebar'
import { useLocation } from 'react-router-dom'
export default function AdminDashboard() {
  const location = useLocation();
  const name = location.state?.name;
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='m-5 flex-3'>
        <p className='text-xl font-semibold'>Welcome, {name}!</p>
        <p>Here's your dashboard overview</p>
        <div className='flex gap-5 mt-5'>
          <div className='flex-1 bg-blue-500 rounded p-5'>
            <p>Total Users</p>
          </div>
          <div className='flex-1'>
            <p>Total Orders</p>
          </div>
          <div className='flex-1'>
            <p>Revenue Today</p>
          </div>
          <div className='flex-2'>
            <p>Support Tickets</p>
          </div>
        </div>
      </div>
    </div>
  )
}
