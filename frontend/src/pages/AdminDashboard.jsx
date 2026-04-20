import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserRecords from '../components/UserRecords';
import { PieChart, Pie, Tooltip, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
export default function AdminDashboard() {
  const [record, setRecord] = useState({});
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];
  const [adminData, setAdminData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {

        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  const role = localStorage.getItem('role');
  useEffect(() => {
    const loadSpecificData = async () => {
      const res = await fetch("http://localhost:8000/api/loadAmount", {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json"
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

      if (data.message === "Data Fetched") {
        console.log(data);
        setRecord(data);
      }
    }

    const loadAdminData = async () => {
      const res = await axios.get('http://localhost:8000/api/adminData', {
        withCredentials: true
      });

      if (res.data.message === "Admin Dashboard data") {
        console.log(res.data);
        setAdminData(res.data);
      }
    }

    if (role !== 'admin')
      loadSpecificData();
    else
      loadAdminData();
  }, []);

  const data = role !== 'admin' ? record?.categoryTotal?.map((item, index) => ({
    name: item.category,
    value: Number(item.total),
    fill: colors[index % colors.length]
  }))
    :
    adminData?.Category?.map((item, index) => ({
      name: item.category,
      value: Number(item.total),
      fill: colors[index % colors.length]
    }))

  const barData = role !== 'admin' ? record?.monthly?.map(item => ({
    name: new Date(2026, item.month - 1).toLocaleString('default', { month: 'short' }),
    income: item.income,
    expense: item.expense
  }))
    :
    adminData?.AnalyticData?.map((item, index) => ({
      name: new Date(2026, item.month - 1).toLocaleString('default', { month: 'short' }),
      income: Number(item.income),
      expense: Number(item.expense)
    }))
  const location = useLocation();
  const name = location.state?.name;

  return (
    <div className='flex'>
      <Sidebar />
      <div className='m-5 flex-3 overflow-y-auto max-h-172 shadow-md'>
        <p className='text-xl font-semibold'>Welcome, {name}!</p>
        <p className='border-b border-gray-400 pb-2 mb-2'>Here's your dashboard overview</p>
        <UserRecords />
        <div className='flex gap-5 mt-[5%]'>
          <div className='flex-1 rounded shadow-[-5px_5px_10px_rgb(0,0,0,0.5)]'>
            <p className='font-semibold m-3 text-xl'>Income Vs Expense</p>
            <ResponsiveContainer width="100%" height={300} className='mt-20'>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill='#36A2EB' />
                <Bar dataKey="expense" fill='#FF6384' />
              </BarChart>
            </ResponsiveContainer>
            <div className='flex items-center ml-10 mt-10 gap-3'>
              <div className='p-1 w-3 h-3 mt-1 rounded-full' style={{ backgroundColor: '#36A2EB' }}></div>
              <p className='text-xl'>Income</p>
            </div>
            <div className='flex items-center ml-10 mt-5 gap-3'>
              <div className='p-1 w-3 h-3 mt-1 rounded-full' style={{ backgroundColor: '#FF6384' }}></div>
              <p className='text-xl'>Expense</p>
            </div>
          </div>
          <div className='flex flex-col flex-1 gap-5 rounded '>
            <div className='flex-1 rounded shadow-[-2px_3px_10px_rgb(0,0,0,0.5)]'>
              <p className='font-semibold m-3 text-xl'>Category Breakdown</p>
              <div className='flex items-center'>
                <PieChart width={350} height={300}>
                  <Pie data={data} outerRadius={100} dataKey="value" label>
                    <Tooltip />
                  </Pie>
                </PieChart>
                <div className='flex flex-col gap-5 ml-10'>
                  {data?.map(item => (
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 rounded-full' style={{ backgroundColor: item.fill }}></div>
                      <p className='text-xl'>
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div className='flex-1 rounded shadow-[-2px_3px_10px_rgb(0,0,0,0.5)]'>
              <p className='font-semibold m-3 text-xl'>Recent Transactions</p>

              <div className=' px-3'>
                {record.transaction ? (
                  record?.transaction?.map(item => (
                    <div key={item.id} className='flex justify-between border-b py-2'>
                      <span>{item.category}</span>
                      <span className={`${item.type === "Income" ? 'text-green-500' : 'text-red-500'}`}>
                        {item.amount}
                      </span>
                    </div>
                  ))
                ) :
                  (
                    adminData?.transaction?.map(item => (
                      <div key={item.id} className='flex justify-between border-b py-2'>
                        <span>{item.category}</span>
                        <span className={`${item.type === "Income" ? 'text-green-500' : 'text-red-500'}`}>
                          {item.amount}
                        </span>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
