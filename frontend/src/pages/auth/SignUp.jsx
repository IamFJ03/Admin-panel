import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-linear-to-r from-gray-200 to-white'>
            <div className='flex-col rounded-xl shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] px-15 py-10 bg-white'>
                <div className='mb-5'>
                    <p className='font-semibold text-2xl flex justify-center'>Create an Account</p>
                    <p className='flex justify-center'>Enter your details below to create your account</p>
                </div>
                <div className='mb-5'>
                    <label>Name:</label><br />
                    <input type='text' placeholder='Full Name' className='border rounded px-2 py-0.5 w-full' required />
                </div>
                <div className='mb-5'>
                    <label>Email address:</label><br />
                    <input type='email' placeholder='email@example.com' className='border rounded px-2 py-0.5 w-full' required />
                </div>
                <div className='mb-5'>
                    <label>Password:</label><br />
                    <input type='password' placeholder='Password' className='border rounded px-2 py-0.5 w-full' required />
                </div>
                <div className='mb-5'>
                    <label>Confirm Password:</label><br />
                    <input type='password' placeholder='Confirm Password' className='border rounded px-2 py-0.5 w-full' required />
                </div>
                <button className='bg-black text-white w-full py-1.5 rounded cursor-pointer'>
                    Create account
                </button>
                <div className='flex justify-center mt-3'>
                    <label>Already have an account?</label><Link to={'/login'} className='font-semibold border-b'>Log in</Link>
                </div>
            </div>
        </div>
    )
}
