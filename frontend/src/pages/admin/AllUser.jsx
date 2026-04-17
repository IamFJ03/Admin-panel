import React, { useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import { User, Check, UserX, UserPlus } from 'lucide-react';
import axios from 'axios';
export default function AllUser() {
  useEffect(() => {
    const loadUsers = async () => {
      const res = await axios.get('http://localhost:8000/api/ExistingUsers',{
        withCredentials: true
      });
      if(res.data.message === "All Users fetched"){
        console.log(res.data.Users)
      }
    }
    loadUsers();
  }, [])
  const userDetails = [
    {
      heading: 'Total Users',
      userCount: 1248,
      color: 'bg-purple-50',
      icon: User,
      iconColor: 'purple'
    },
    {
      heading: 'Active Users',
      userCount: 1156,
      color: 'bg-green-50',
      icon: Check,
      iconColor: 'green'
    },
    {
      heading: 'New this month',
      userCount: 42,
      color: 'bg-blue-50',
      icon: UserPlus,
      iconColor: 'blue'
    },
    {
      heading: 'Inactive Users',
      userCount: 92,
      color: 'bg-orange-50',
      icon: UserX,
      iconColor: 'orange'
    }

  ]
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <p className='m-5 text-xl font-semibold'>All Users</p>
        <div className='grid grid-cols-4 mx-5 gap-5'>
          {userDetails.map((item, index) => {
            const Icon = item.icon
            return (

              <div className={`${item.color} p-2 rounded shadow-md`}>
                <div className='flex items-center gap-5'>
                  <div>
                    <Icon size={30} color={item.iconColor} />
                  </div>
                  <div>
                    <p>{item.heading}</p>
                    <p className='text-xl font-semibold'>{item.userCount}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
          <div className='bg-gray-200 m-5 rounded'>
            <ul className='grid grid-cols-6 px-5 py-1 text-gray-500'>
              <li>USER</li>
              <li>EMAIL</li>
              <li>ROLE</li>
              <li>STATUS</li>
              <li>JOINED</li>
              <li>ACTIONS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
