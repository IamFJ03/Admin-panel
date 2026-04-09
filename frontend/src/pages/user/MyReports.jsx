import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar';
import { PieChart, Pie, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { motion } from "framer-motion";

export default function MyRecords() {
  const [currDate, setCurrDate] = useState("This Month");
  const [category, setCategory] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [currentMonth, setCurrentMonth] = useState({});

  const filterCategory = async () => {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`http://127.0.0.1:8000/api/filterCategory?category=${encodeURIComponent(category)}&date=${encodeURIComponent(currDate)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) {
      if (data.errors) {
        console.log(data.errors);
      }
      else {
        console.log(data.message);
      }
    }

    if (data.message === "Category Data Fetched") {
      console.log(data);
      setCategoryData(data.categoryData);
      setCategoryTotal(data.categoryTotal);
      setCurrentMonth(data.currentMonth);
    }
  }

  useEffect(() => {
    filterCategory();
  }, [category, currDate]);

  const pieData = [
    {
      name: "Income",
      value: Number(currentMonth.income),
      fill: '#007bff'
    },
    {
      name: "Expense",
      value: Number(currentMonth.expense),
      fill: '#bff007'
    }
  ];

  const barData = [
    {
      name: "April",
      income: Number(currentMonth.income),
      expense: Number(currentMonth.expense)
    },
    {}
  ]
  const financeData = [
    {
      type: 'Income',
      amount: Number(currentMonth.income),
      statement: `${currentMonth.incomeTransaction} transactions`,
      color: 'bg-green-100'
    },
    {
      type: 'Expense',
      amount: Number(currentMonth.expense),
      statement: `${currentMonth.expenseTransaction} transactions`,
      color: 'bg-red-100'
    },
    {
      type: 'Net Balance',
      amount: Number(currentMonth.balance),
      statement: '(Income - Expenses)',
      color: 'bg-blue-100'
    }
  ]
  return (
    <div className='flex'>
      <Sidebar />
      <div className='m-5 flex-3 shadow-md overflow-y-scroll max-h-173'>
        <p className='text-xl font-semibold m-5'>My Reports</p>
        <div className='ml-5 flex gap-5 items-center'>
          <label>Show:</label>
          <select value={currDate} onChange={(e) => setCurrDate(e.target.value)} className='border border-gray-400 rounded p-1 cursor-pointer w-[20%]'>
            <option value="This Month">{new Date().toLocaleString('default', { month: 'long' })}</option>
            <option value={new Date(new Date().setMonth(new Date().getMonth() - 1))
                .toLocaleString('default', { month: 'long' })}>
              {new Date(new Date().setMonth(new Date().getMonth() - 1))
                .toLocaleString('default', { month: 'long' })}
            </option>

            <option value={new Date(new Date().setMonth(new Date().getMonth() - 2))
                .toLocaleString('default', { month: 'long' })}>
              {new Date(new Date().setMonth(new Date().getMonth() - 2))
                .toLocaleString('default', { month: 'long' })}
            </option>

            <option value={new Date(new Date().setMonth(new Date().getMonth() - 3))
                .toLocaleString('default', { month: 'long' })}>
              {new Date(new Date().setMonth(new Date().getMonth() - 3))
                .toLocaleString('default', { month: 'long' })}
            </option>
          </select>
          <label>Category:</label>
          <select value={category} onChange={(e) => {
            setCategory(e.target.value)
          }} className='border border-gray-400 rounded p-1 cursor-pointer w-[20%]'>
            <option value="All" disabled>All</option>
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
            <PieChart width={350} height={250} className='mt-5'>
              <Pie data={pieData} outerRadius={100} dataKey="value" label>
                <Tooltip />
              </Pie>
            </PieChart>
          </div>
          <div className='flex-1'>
            <p className='text-xl font-semibold'>Cash Flow</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} className='mt-5'>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="income" fill='#36A2EB' />
                <Bar dataKey="expense" fill='#FF6384' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='m-5'>
          <p className='text-xl font-semibold'>Transactions by Category</p>
          <div className='my-5'>
            <ul className='grid grid-cols-4 bg-gray-200 p-2 text-gray-500'>
              <li>Category</li>
              <li>Amount</li>
              <li>No of Transactions</li>
              <li>Percentage</li>
            </ul>

            {categoryData.map(item => (
              <ul className='grid grid-cols-4 p-2'>
                <li>{item.category}</li>
                <li>{item.total}</li>
                <li>{item.counts}</li>
                <div className='flex items-center gap-5'>
                  <div className='h-3 bg-gray-200 w-50 rounded-2xl'>
                    <motion.div className='bg-blue-500 h-3 rounded-2xl '
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((parseFloat(item.total) / categoryTotal) * 100).toFixed(2)}%`
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                  </div>
                  <li>{((item.total / categoryTotal) * 100).toFixed(2)}%</li>
                </div>
              </ul>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}
