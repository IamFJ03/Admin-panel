import React, { useState } from 'react'
import Sidebar from '../../components/sidebar'
import Records from '../../assets/records_image.png';
import toast from "react-hot-toast"
export default function MyRecords() {
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState("");
    const [type, setType] = useState("");
    const handleAddRecord = async () => {
        console.log("Sending:", { category, type, date, amount, notes });
        if (category === "" || type === "" || date === "" || amount === "" || notes === "") {
            toast.error("All Fields are required");
            return;
        }
        toast.success(date);
        const token = localStorage.getItem('token');
        const res = await fetch("http://127.0.0.1:8000/api/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                date, type, amount: Number(amount), category, notes
            })
        });

        const data = await res.json();

        if (!res.ok) {
            console.log("Error", data.message);
        }
        if (data.message === "Record stored") {
            console.log(data.user);
            toast.success(data.user.name)
        }
    }
    const handleClear = () => {

    }
    return (
        <div>
            <div className='flex'>
                <Sidebar />
                <div className='flex-1 shadow-lg m-10 rounded'>
                    <div >
                        <p className='p-5 text-xl font-semibold'>Add Records</p>
                    </div>
                    <div className='flex flex-wrap gap-10 ml-5'>
                        <div className='w-[45%]'>
                            <label>Type:</label><br />
                            <select value={type} onChange={(e) => setType(e.target.value)} className='py-2 px-2 w-[80%] rounded border border-gray-400 my-2'>
                                <option value="" disabled>All Types</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div className='w-[45%]'>
                            <label>Amount</label><br />
                            <input value={amount} onChange={(e) => setAmount(e.target.value)} type='text' placeholder='Enter Amount' className='py-2 px-2 w-[80%] my-2 rounded border border-gray-400' />
                        </div>
                        <div className='w-[45%]'>
                            <label>Category</label><br />
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className='py-2 my-2 px-2 w-[80%] rounded border border-gray-400'>
                                <option value="" disabled>All Categories</option>
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
                        <div className='w-[45%]'>
                            <label>Date</label><br />
                            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='py-2 px-2 w-[80%] rounded border border-gray-400 my-2' />
                        </div>
                        <div className='w-[45%]'>
                            <label>Notes</label><br />
                            <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Write Some notes...' className='py-2 px-2 w-[80%] my-2 rounded border border-gray-400' required></textarea>
                        </div>
                        <div>
                            <img src={Records} className=' bg-black h-53 -ml-5 pointer-events-none' />
                        </div>

                    </div>
                    <div className='flex gap-10 justify-end mr-40 mt-5 '>
                        <button className=' cursor-pointer px-5 py-2 bg-gray-200 rounded hover:scale-110 transition-all duration-500' onClick={handleClear}>Clear</button>
                        <button type="button" className='cursor-pointer text-white bg-blue-500 px-5 py-2 rounded hover:scale-110 transition-all duration-500' onClick={() => {
                            handleAddRecord();
                        }}>Add Records</button>
                    </div>
                </div>
            </div>
        </div>
    )
}