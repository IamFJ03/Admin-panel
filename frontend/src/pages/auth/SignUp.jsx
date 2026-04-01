import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");

    const handleSubmit = async () => {
        try {
            if (password !== cnfPassword) {
                toast.error("password must match")
                return;
            }
            const res = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    if (data.errors.name) toast.error(data.errors.name);
                    else if (data.errors.email) toast.error(data.errors.email);
                    else toast.error(data.errors.password);
                    return;
                }
                else {
                    console.log("Error", data.message);
                    toast.error(data.message);
                }
            }
            console.log("data", data);
            toast.success(data.message);
        }
        catch (e) {
            console.log("Error", e);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-linear-to-r from-gray-200 to-white'>
            <div className='flex-col rounded-xl shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] px-15 py-10 bg-white'>
                <div className='mb-5'>
                    <p className='font-semibold text-2xl flex justify-center'>Create an Account</p>
                    <p className='flex justify-center'>Enter your details below to create your account</p>
                </div>
                <div className='mb-5'>
                    <label>Name:</label><br />
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Full Name' className='border border-gray-400 rounded px-2 py-0.5 w-full' required />
                </div>
                <div className='mb-5'>
                    <label>Email address:</label><br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email@example.com' className='border border-gray-400 rounded px-2 py-0.5 w-full' required />
                </div>
                <div className='mb-5'>
                    <label>Password:</label><br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' className='border border-gray-400 rounded px-2 py-0.5 w-full' required />
                </div>
                <div className='mb-5'>
                    <label>Confirm Password:</label><br />
                    <input value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} type='password' placeholder='Confirm Password' className='border border-gray-400 rounded px-2 py-0.5 w-full' required />
                </div>
                <button onClick={handleSubmit} className='bg-black text-white w-full py-1.5 rounded cursor-pointer'>
                    Create account
                </button>
                <div className='flex justify-center mt-3'>
                    <label>Already have an account?</label><Link to={'/login'} className='font-semibold border-b text-blue-500'>Log in</Link>
                </div>
            </div>
        </div>
    )
}
