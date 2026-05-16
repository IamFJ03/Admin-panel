import React from 'react'
import Sidebar from '../../components/sidebar';
import { User, Check, UserX, UserPlus, Menu } from 'lucide-react';
import UserInfo from '../../components/UserInfo';
export default function Reports() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <span className='text-xl ml-5 font-semibold text-gray-400'>Reports</span><span className='text-xl ml-2 font-semibold'>/ Users</span>
        <p className='ml-5 text-gray-400'>View and analyze user data. Select a user to see detailed information.</p>
        <UserInfo />
        <div className='grid grid-cols-2 gap-2 m-5'>
          <div className='shadow-md flex-1'>ksd</div>
          <div className='shadow-md flex-1'>jsd</div>
        </div>
      </div>
    </div>
  )
}
