import React from 'react'
import Sidebar from '../../components/sidebar'
export default function Settings() {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-3 m-5 shadow-md'>
                <div className='m-5'>
                    <p className='text-xl font-semibold'>Settings</p>
                    <p className='text-gray-500'>Manage your profile and account settings</p>
                </div>
                <div className='ml-5'>
                    <p className='text-xl font-semibold'>Profile Information</p>
                    <div className='m-5'>
                        <p className='mb-2'>Name:</p>
                        <input type='text' placeholder='Enter Name...' className='w-70 border py-1 px-2 rounded' />
                    </div>
                    <div className='m-5'>
                        <p className='mb-2'>Email:</p>
                        <input type='text' placeholder='email@example.com' className='w-70 border py-1 px-2 rounded' />
                    </div>
                    <button className='bg-blue-500 text-white py-1 px-3 rounded ml-5'>Change</button>
                </div>
                <div className='m-5'>
                    <p className='text-xl font-semibold'>Delete Acoount</p>
                    <p>Delete your account and all of its resources</p>
                    <div className='text-red-500 p-5 m-5 bg-red-200 rounded-2xl'>
                        <p className='text-xl font-semibold'>Warning!</p>
                        <p>Please Proceed with caution, this cannot be undone...</p>
                        <button className='bg-red-500 text-white mt-5 px-3 py-2 rounded cursor-pointer'>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
