import React from 'react'
import Sidebar from '../../components/sidebar';
import {PieChart, Pie, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis} from 'recharts';
export default function MyRecords() {
  const pieData = [
    {
      name: "Income",
      value: 5250,
      fill: '#007bff'
    },
    {
      name: "Expense",
      value: 2430,
      fill: '#bff007'
    }
  ];

  const barData = [
    {
      name: "April",
      income: 5250,
      expense: 2430
    },
    {}
  ]
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
          <p className='text-xl font-semibold mb-5'>Finance Overview</p>
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
        <div className='flex mx-5 gap-10'>
          <div className='flex-1'>
            <p className='text-xl font-semibold'>Income vs Expense</p>
            <PieChart width={350} height={250}>
              <Pie data={pieData} outerRadius={100} dataKey="value" label>
                <Tooltip />
              </Pie>
            </PieChart>
          </div>
          <div className='flex-1'>
            <p className='text-xl font-semibold'>Cash Flow</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis />
                <Bar dataKey="income" fill='#36A2EB'/>
                <Bar dataKey="expense" fill='#FF6384'/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
