import React from 'react'
import Sidebar from '../../components/sidebar'
export default function MyRecords() {
  const financeData = [
    {
      type: 'Income',
      amount: 5250,
      statement: '12 transactions',
      color: 'bg-green-100'
    },
    {
      type: 'Expense',
      amount: 2430,
      statement: '8 transactions',
      color: 'bg-red-100'
    },
    {
      type: 'Net Balance',
      amount: 2820,
      statement: '(Income - Expenses)',
      color: 'bg-blue-100'
    }
  ]
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
        <div className='m-5'>
          <p className='text-xl font-semibold'>Finance Overview</p>
          <div className='flex justify-between gap-5'>
            {financeData.map(item => (
              <div className={`p-5 ${item.color} flex-1 rounded`}>
<p className=''>{item.type}</p>
<p className='text-xl font-semibold'>{item.amount}</p>
<p className='text-sm text-gray-400'>{item.statement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
