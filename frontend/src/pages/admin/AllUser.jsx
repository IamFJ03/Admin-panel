import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar';
import { User, Check, UserX, UserPlus, Menu } from 'lucide-react';
import axios from 'axios';
import UserInfo from '../../components/UserInfo';
export default function AllUser() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const loadUsers = async () => {
      const res = await axios.get('http://localhost:8000/api/ExistingUsers', {
        withCredentials: true
      });
      if (res.data.message === "All Users fetched") {
        console.log(res.data.Users)
        setUserData(res.data.Users.data)
        
      }
    }
    loadUsers();
  }, [])
  
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <p className='m-5 text-xl font-semibold'>All Users</p>
        <UserInfo />
        <div className='h-9/12 shadow-md m-5'>
          <div className='flex items-center justify-between m-5'>
            <input type='text' placeholder='Search by name or email...' className='w-72 m-5 p-1 border border-gray-400 rounded' />
            <div className='flex items-center gap-3 border px-3 py-1 border-gray-400 rounded'>
              <p>Sort by:</p>
              <select className='border-none'>
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </div>
          </div>
          <div>
            <ul className='grid grid-cols-6 px-5 py-1 text-gray-500 bg-gray-200 m-5 rounded'>
              <li>USER</li>
              <li>EMAIL</li>
              <li>ROLE</li>
              <li>STATUS</li>
              <li>JOINED</li>
              <li>ACTIONS</li>
            </ul>
            <div>
              {
                userData?.map((item, index) => {
                  const getActiveness = new Date() - new Date(item.last_seen) <= 2 * 24 * 60 * 60 * 1000;
                  return (
                  <ul className='grid grid-cols-6 px-5 py-2 text-gray-500'>
                    <li>{item.name}</li>
                    <li>{item.email}</li>
                    <li>{item.role}</li>
                    <li className={`${getActiveness ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'} rounded w-25 px-5 py-1`}>
                      { getActiveness
                        ? "Active"
                        : "InActive"}
                    </li>
                    <li>{new Date(item.created_at).toLocaleDateString()}</li>
                    <li className='flex gap-5 -ml-10'>
                      <button className='bg-green-100 text-green-500 py-1 px-5 rounded cursor-pointer'>Promote</button>
                      <button className='bg-red-100 text-red-500 py-1 px-5 rounded cursor-pointer'>Remove</button>
                    </li>
                  </ul>
                )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
