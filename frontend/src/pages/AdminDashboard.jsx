import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Receipt, Landmark, ArrowDownLeft } from 'lucide-react';
import { PieChart, Pie, Tooltip,BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
export default function AdminDashboard() {
  const[record, setRecord] = useState({});
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loadSpecificData = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/loadAmount",{
        method:"GET",
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      const data = await res.json();
      if(!res.ok){
        if(data.errors){
          console.log(data.errors);
        }
        else{
          console.log(data.message);
        }
      }

      if(data.message === "Data Fetched"){
        console.log(data);
        setRecord(data);
      }
    }

    loadSpecificData();
  },[]);

  const data = record?.categoryTotal?.map((item, index) => ({
    name: item.category,
    value: Number(item.total),
    fill: colors[index%colors.length]
  }))

const barData = record?.monthly?.map(item => ({
  name: new Date(2026, item.month - 1).toLocaleString('default', { month: 'short' }),
  income: item.income,
  expense: item.expense
}))
  const location = useLocation();
  const name = location.state?.name;
  const role = location.state?.role;
  return (
    <div className='flex'>
      <Sidebar role={role}/>
      <div className='m-5 flex-3'>
        <p className='text-xl font-semibold'>Welcome, {name}!</p>
        <p className='border-b border-gray-400 pb-2 mb-2'>Here's your dashboard overview</p>
        <div className='flex gap-5 mt-5 text-white'>
          <div className='flex items-center gap-5 flex-1 bg-blue-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <ArrowDownLeft size={35} color='white' />
            <div>
              <p>Total Income</p>
              <p className='text-2xl'>+{record?.totals?.income}</p>
            </div>
          </div>
          <div className='flex flex-1 gap-5 items-center bg-green-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <ArrowUpRight size={35} color='white' />
            <div>
              <p>Total Expense</p>
              <p className='text-2xl'>-{record?.totals?.expense}</p>
            </div>
          </div>
          <div className=' flex flex-1 gap-5 items-center bg-orange-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <Landmark size={35} color='white' />
            <div>
              <p>Net Balance</p>
              <p className='text-2xl'>{record?.totals?.balance}</p>
            </div>
          </div>
          <div className='flex flex-2 items-center gap-5 bg-purple-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
            <Receipt size={35} color='white' />
            <div>
              <p>Total Records</p>
              <p className='text-2xl'>+{record?.totalRecords}</p>
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
