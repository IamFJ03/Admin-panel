import React from 'react'
import Sidebar from '../components/sidebar'
import { useLocation } from 'react-router-dom'
import { DollarSign, Headphones, Package, User } from 'lucide-react';
import { PieChart, Pie, Tooltip,BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
export default function AdminDashboard() {
  const data = [
  { name: "Food", value: 400, fill: "#0088FE" },
  { name: "Rent", value: 800, fill: "#00C49F" },
  { name: "Travel", value: 300, fill: "#FFBB28" }
];

const barData = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 5000, expense: 3800 },
  { name: "Apr", income: 4780, expense: 2908 },
  { name: "May", income: 5890, expense: 3908 }
];
  const location = useLocation();
  const name = location.state?.name;
  return (
    <div className='flex'>
      <Sidebar />
      <div className='m-5 flex-3'>
        <p className='text-xl font-semibold'>Welcome, {name}!</p>
        <p className='border-b border-gray-400 pb-2 mb-2'>Here's your dashboard overview</p>
        <div className='flex gap-5 mt-5 text-white'>
          <div className='flex items-center gap-5 flex-1 bg-blue-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <User size={35} color='white' />
            <div>
              <p>Total Income</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
          <div className='flex flex-1 gap-5 items-center bg-green-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <Package size={35} color='white' />
            <div>
              <p>Total Expense</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
          <div className=' flex flex-1 gap-5 items-center bg-orange-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <DollarSign size={35} color='white' />
            <div>
              <p>Net Balance</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
          <div className='flex flex-2 items-center gap-5 bg-purple-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <Headphones size={35} color='white' />
            <div>
              <p>Total Records</p>
              <p className='text-2xl'>0+</p>
            </div>
          </div>
        </div>
        <div className='flex gap-5 h-[65%] mt-[5%]'>
          <div className='flex-1 rounded shadow-[-5px_5px_10px_rgb(0,0,0,0.5)]'>
            <p className='font-semibold m-3 text-xl'>Income Vs Expense</p>
            <ResponsiveContainer width="100%" height={300} className='mt-20'>
<BarChart data={barData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="income" fill='#36A2EB'/>
  <Bar dataKey="expense" fill='#FF6384' />
</BarChart>

            </ResponsiveContainer>
          </div>
          <div className='flex flex-col flex-1 gap-5 rounded '>
            <div className='flex-1 rounded shadow-[-2px_3px_10px_rgb(0,0,0,0.5)]'>
              <p className='font-semibold m-3 text-xl'>Category Breakdown</p>
              <PieChart width={350} height={250}>
                <Pie data={data} outerRadius={100} dataKey="value" label>
                  <Tooltip />
                </Pie>
              </PieChart>
            </div>
            <div className='flex-1 rounded shadow-[-2px_3px_10px_rgb(0,0,0,0.5)]'>
              <p className='font-semibold m-3 text-xl'>Recent Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
