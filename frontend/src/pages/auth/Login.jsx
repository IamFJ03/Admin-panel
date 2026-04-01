import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    if (data.errors.email) toast.error(data.errors.email);
                    else toast.error(data.errors.password);
                }
                else {
                    console.log("Error", data.message);
                    toast.error(data.message);
                }
            }
            if (data.message === "User Exists") {
                console.log("Login Successfull", data.user);
                toast.success("Login Succesfull");
                navigate("/admin-dashboard");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className='relative flex justify-center items-center w-screen h-screen bg-linear-to-r from-gray-200 to-white'>
            <div className='flex-col relative rounded-xl shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] px-15 py-10 z-100 bg-white'>
                <p className='font-semibold text-2xl flex justify-center'>Log in to your account</p>
                <p className='text-sm flex justify-center mb-10'>Enter your email and password below to log in</p>
                <div>
                    <label>Email Address:</label><br />
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email@example.com' className='border border-gray-400 w-full px-1 py-0.5 rounded' required />
                </div>
                <div className='flex justify-end mb-3'>
                    <Link to="" className='text-sm cursor-pointer text-blue-500' style={{}}>Forgot password?</Link>
                </div>
                <div>
                    <label>Password:</label><br />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='border border-gray-400 w-full px-1 py-0.5 rounded' required />
                </div>
                <button className='bg-black text-white py-1 w-full cursor-pointer rounded mt-5' onClick={handleSubmit}>
                    Log in
                </button>
                <div className='mt-5 flex justify-center'>
                    <label>Don't have an account?</label>
                    <Link to={'/register'} className='border-b text-blue-500'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}
