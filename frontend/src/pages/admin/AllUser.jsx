import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import axios from 'axios';
export default function AllUser() {
  useEffect(() => {
      const loadUsers = async () => {
          const res = await axios.get('http://localhost:8000/api/');
      }
  },[])
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <p className='m-5 text-xl font-semibold'>All Users</p>
      </div>
    </div>
  )
}
