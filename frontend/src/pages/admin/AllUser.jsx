import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import axios from 'axios';
export default function AllUser() {
  useEffect(() => {
      const loadUsers = async () => {
          const res = await axios.get('http://localhost:8000/api/');
      }
  },[])
  const userDetails = [
      {
        heading: 'Total Users',
        userCount: 1248,
        color: 'white'
      },
      {
        heading: 'Active Users',
        userCount: 1156,
        color: 'bg-green-50'
      },
      {
        heading: 'New this month',
        userCount: 42,
        color: 'bg-blue-50'
      },
      {
        heading: 'Inactive Users',
        userCount: 92,
        color: 'bg-orange-50'
      }
      
    ]
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <p className='m-5 text-xl font-semibold'>All Users</p>
        <div className='grid grid-cols-4 mx-5 gap-5'>
          {userDetails.map((item, index) => (
            <div className={`${item.color} p-2 rounded`}>
              <p>{item.heading}</p>
              <p className='text-xl font-semibold'>{item.userCount  }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
