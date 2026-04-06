import React from 'react'
import Sidebar from '../../components/sidebar'
export default function MyRecords() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='m-5 flex-3 shadow-md'>
        <p className='text-xl font-semibold m-5'>My Reports</p>
        <div className='ml-5 flex gap-5 items-center'>
          <label>Show:</label>
          <select className='border border-gray-400 rounded p-1 cursor-pointer w-[20%]'>
            <option value="">Show</option>
            <option value="">This Month</option>
            <option value="">All Reports</option>
          </select>
          <label>Category:</label>
          <select className='border border-gray-400 rounded p-1 cursor-pointer w-[20%]'>
            <option value="" disabled>Select Categories</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Food">Food</option>
            <option value="Freelance">Freelance</option>
            <option value="Utilities">Utilities</option>
            <option value="Transport">Transport</option>
            <option value="Insurance">Insurance</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>
    </div>
  )
}
