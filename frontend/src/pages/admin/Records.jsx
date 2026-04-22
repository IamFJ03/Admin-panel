import React from 'react'
import Sidebar from '../../components/sidebar';
import UserRecords from '../../components/UserRecords';
import { Filter, Search } from 'lucide-react';
export default function Records() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='shadow-md m-5 flex-3'>
        <UserRecords />
        <div className='m-5 shadow-md'>
          <div className='flex items-center gap-10 m-5 py-5'>
            <div className='flex items-center border border-gray-400 px-2 rounded gap-3'>
              <Search size={15} color='black' />
              <input type='text' placeholder='Search by name or email...' className='w-72 py-1 px-2 rounded focus:outline-none ' />
            </div>
            <div className='flex items-center border border-gray-400 gap-2 cursor-pointer py-1 px-2 rounded'>
              <Filter size={15} color='black' />
              <button className=''>Filter</button>
            </div>
          </div>
          <div>
            <ul className='grid grid-cols-5 bg-gray-100 p-5 font-semibold text-gray-500'>
              <li>USER</li>
              <li>TOTAL EARNINGS</li>
              <li>TOTAL PAID</li>
              <li>BALANCE</li>
              <li>LAST PAYMENT DATE</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
