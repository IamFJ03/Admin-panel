import React from 'react'
import Sidebar from '../../components/sidebar';
import { User, Check, UserX, UserPlus, Menu, Search } from 'lucide-react';
import UserInfo from '../../components/UserInfo';
export default function Reports() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <span className='text-xl ml-5 font-semibold text-gray-400'>Reports</span><span className='text-xl ml-2 font-semibold'>/ Users</span>
        <p className='ml-5 text-gray-400'>View and analyze user data. Select a user to see detailed information.</p>
        <UserInfo />
        <div className=' gap-2 flex m-5 h-9/12'>
          <div className='shadow-md p-3 flex-2'>
            <div className='flex items-center justify-between '>
              <div className='flex items-center border border-gray-400 rounded px-3'>
                <input type='text' placeholder='Search by name or email...' className='w-72 p-1 outline-none rounded' />
                <Search size={18} className='cursor-pointer' />
              </div>
              <div className='flex items-center gap-3 border px-3 py-1 border-gray-400 rounded'>
                <p>Sort by:</p>
                <select className='border-none'>
                  <option value="">Newest</option>
                  <option value="">Oldest</option>
                </select>
              </div>
            </div>
            <div>
              <ul className='grid grid-cols-3 px-5 py-2 text-gray-500 bg-gray-100 my-5 rounded'>
              <li>USER</li>
              <li>EMAIL</li>
              <li>ROLE</li>
            </ul>
            </div>
          </div>
          <div className='shadow-md p-3 flex-1'>jsd</div>
        </div>
      </div>
    </div>
  )
}
