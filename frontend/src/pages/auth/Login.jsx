import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {

            await axios.get("http://localhost:8000/sanctum/csrf-cookie",{
                withCredentials: true
            });
            const res = await axios.post("http://localhost:8000/login",{
                email, password
            },{
                withCredentials: true
            });


            
            if (res.data.message === "Login successful") {
                console.log("Login Successfull", res.data.user);
                console.log("Login Successfull", res.data.token);
                localStorage.setItem("role", res.data.user.role);
                toast.success("Login Succesfull");

                navigate("/admin-dashboard", {
                    state: {
                        name: res.data.user.name,
                        
                    }
                });
            }
        } catch (error) {
        console.error("Error:", error);

        if (error.response) {
            const data = error.response.data;

            if (data.errors) {
                if (data.errors.email) toast.error(data.errors.email[0]);
                else if (data.errors.password) toast.error(data.errors.password[0]);
            } else {
                toast.error(data.message || "Login failed");
            }
        } else {
            toast.error("Server not responding");
        }
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
