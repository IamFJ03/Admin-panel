import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar';
import { User, Check, UserX, UserPlus, Menu, Search } from 'lucide-react';
import UserInfo from '../../components/UserInfo';
import axios from 'axios';

export default function Reports() {
  const [userData, setUserData] = useState([]);
  const [specificUser, setSpecificUser] = useState({});
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
  }, []);
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-3 m-5 shadow-md'>
        <span className='text-xl ml-5 font-semibold text-gray-400'>Reports</span><span className='text-xl ml-2 font-semibold'>/ Users</span>
        <p className='ml-5 text-gray-400'>View and analyze user data. Select a user to see detailed information.</p>
        <UserInfo />
        <div className=' gap-2 flex m-5 h-9/12'>
          <div className='shadow-md p-3 flex-2'>
            <div className='flex items-center justify-between '>
              <div className='flex items-center border border-gray-400 rounded px-3'>
                <input type='text' placeholder='Search by name or email...' className='w-72 p-1 outline-none rounded' />
                <Search size={18} className='cursor-pointer' />
              </div>
              <div className='flex items-center gap-3 border px-3 py-1 border-gray-400 rounded'>
                <p>Sort by:</p>
                <select className='border-none'>
                  <option value="">Newest</option>
                  <option value="">Oldest</option>
                </select>
              </div>
            </div>
            <div>
              <ul className='grid grid-cols-3 px-5 py-2 text-gray-500 bg-gray-100 my-5 rounded'>
                <li>USER</li>
                <li>EMAIL</li>
                <li>ROLE</li>
              </ul>
              <div>
                {
                  userData?.map((item, index) => {
                    const getActiveness = new Date() - new Date(item.last_seen) <= 2 * 24 * 60 * 60 * 1000;
                    return (
                      <ul className='grid grid-cols-3 px-5 py-2 text-gray-500'>
                        <li>{item.name}</li>
                        <li>{item.email}</li>

                        <li className='flex items-center justify-between'>
                          <p>{item.role}</p>
                          <p className='mr-10 cursor-pointer' onClick={() => {
                            setSpecificUser(userData.find(itm => itm.id === item.id))
                          }}>View</p>
                        </li>
                      </ul>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='shadow-md p-5 flex-1 rounded-xl border border-gray-200'>
            {
              specificUser?.id ?
              <div>
                <div className='flex items-start justify-between'>

              {/* Left */}
              <div className='flex items-center gap-3'>

                {/* Avatar */}
                <div className='w-14 h-14 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg'>
                  {specificUser?.name?.charAt(0)}
                </div>

                {/* Name + status */}
                <div>
                  <div className='flex items-center gap-2'>
                    <h2 className='font-semibold text-lg'>
                      {specificUser?.name}
                    </h2>

                    <span className='bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full'>
                      Active
                    </span>
                  </div>

                  <p className='text-sm text-gray-400'>
                    ID: U-{specificUser?.id} • Joined{" "}
                    {new Date(specificUser?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button className='text-gray-400 hover:text-black text-xl' onClick={() => setSpecificUser({})}>
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className='flex gap-6 mt-6 border-b text-sm font-medium'>
              <button className='pb-2 border-b-2 border-blue-500 text-blue-500'>
                Overview
              </button>

              <button className='pb-2 text-gray-400 hover:text-black'>
                Activity
              </button>

              <button className='pb-2 text-gray-400 hover:text-black'>
                Permissions
              </button>
            </div>

            {/* User Information */}
            <div className='mt-6'>
              <h3 className='font-semibold mb-4'>User Information</h3>

              <div className='space-y-4 text-sm'>

                <div className='grid grid-cols-2'>
                  <span className='text-gray-400'>Full Name</span>
                  <span>{specificUser?.name}</span>
                </div>

                <div className='grid grid-cols-2'>
                  <span className='text-gray-400'>Email</span>
                  <span>{specificUser?.email}</span>
                </div>

                <div className='grid grid-cols-2'>
                  <span className='text-gray-400'>Role</span>
                  <span className='capitalize'>{userData[0]?.role}</span>
                </div>

                <div className='grid grid-cols-2'>
                  <span className='text-gray-400'>Status</span>

                  <span className='text-green-600 font-medium'>
                    Active
                  </span>
                </div>

                <div className='grid grid-cols-2'>
                  <span className='text-gray-400'>Last Login</span>

                  <span>
                    {new Date(specificUser?.last_seen).toLocaleString()}
                  </span>
                </div>


              </div>
            </div>
              </div>
              :
              <div className='flex flex-col justify-center items-center h-full'>
                <p className='text-gray-400'>Select any User to check on his Reports...</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
