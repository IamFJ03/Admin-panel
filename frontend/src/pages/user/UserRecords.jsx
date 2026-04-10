import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar'
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
export default function UserRecords() {
    const [category, setCategory] = useState("");
    const [allTypes, setAllTypes] = useState("");
    const [range, setRange] = useState("All");
    const [allRecords, setAllRecords] = useState([]);
    useEffect(() => {
        const loadRecords = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://127.0.0.1:8000/api/loadRecords?category=${encodeURIComponent(category)}&date=${encodeURIComponent(range)}&types=${encodeURIComponent(allTypes)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.errors) {
                    console.log(data.errors);
                }
                else
                    console.log(data.message);
            }

            if (data.message === "Records Fetched") {
                toast.success("Records Fetched")
                console.log(data.records);
                setAllRecords(data.records);
            }
        }

        loadRecords()

    }, [range, category, allTypes])


    const handleRecordDelete = async (recordId) => {
        console.log(recordId);
        const token = await localStorage.getItem('token');
        const res = await fetch(`http://127.0.0.1:8000/api/deleteRecord/${recordId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
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

        if (data.message === "Deleted successfully") {
            setAllRecords((prev) =>
                prev.filter(item => item.id !== recordId)
            )
        }
    }

    return (
        <div>
            <div className='flex'>
                <Sidebar />
                <div className='flex-3 w-full m-5 rounded shadow-md flex flex-col'>
                    <div className='p-5'>
                        <p className='text-xl font-semibold'>My Records</p>
                        <p className='text-gray-500'>View and manage all your income and expense Records</p>
                    </div>
                    <div className='flex justify-between mx-5 p-3 rounded shadow-md'>
                        <div className='flex gap-3 items-center rounded bg-gray-200 p-1'>
                            <Search size={15} color='black' className='cursor-pointer' />
                            <input type='text' placeholder='Search records' className='focus:outline-none focus:border-gray-200' />
                        </div>
                        <div>
                            <select value={allTypes} onChange={(e) => setAllTypes(e.target.value)} className='border border-gray-500 rounded p-1 w-[120%]'>
                                <option value="" className='font-semibold'>All Types</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expenses</option>
                            </select>
                        </div>
                        <div>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className='border border-gray-500 rounded p-1 w-[120%]'>
                                <option value="" className='font-semibold'>All Categories</option>
                                <option value="food">Food</option>
                                <option value="rent">Rent</option>
                                <option value="salary">Salary</option>
                            </select>
                        </div>

                        <div>
                            <select
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                                className='border border-gray-400 rounded p-1 cursor-pointer'
                            >
                                {/* Option 1: Current Month */}
                                <option value="All">
                                    All Time
                                </option>
                                <option value={new Date().getMonth()+1}>
                                    {new Date(new Date().setMonth(new Date().getMonth())).toLocaleString('default', { month: 'long' })}
                                </option>
                                <option value={new Date().getMonth()}>
                                    {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })}
                                </option>

                                <option value={new Date().getMonth() - 1}>
                                    {new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleString('default', { month: 'long' })}
                                </option>

                                <option value={new Date().getMonth() - 2}>
                                    {new Date(new Date().setMonth(new Date().getMonth() - 3)).toLocaleString('default', { month: 'long' })}
                                </option>
                            </select>
                        </div>
                        <div className='flex items-center bg-gray-200 py-1 px-5 gap-2 rounded cursor-pointer'>
                            <Filter size={15} color='black' />
                            <button >Filter</button>
                        </div>
                    </div>
                    <div className='m-5 shadow-lg h-full text-gray-500'>
                        <ul className='grid grid-cols-6 p-3 bg-gray-200 rounded pl-5'>
                            <li>Date</li>
                            <li>Type</li>
                            <li>Category</li>
                            <li>Amount</li>
                            <li>Notes</li>
                            <li>Actions</li>
                        </ul>
                        <div>
                            {allRecords?.map((data, index) => (
                                <ul key={index} className='grid grid-cols-6 m-5'>
                                    <li>{data.date}</li>
                                    <li className={`${data.type === "Income" ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} w-[60%] rounded px-7 py-1`}>{data.type}</li>
                                    <li>{data.category}</li>
                                    <li className={`${data.type === "Income" ? 'text-green-500' : 'text-red-500'} font-semibold`}>{data.amount}</li>
                                    <li>{data.notes}</li>
                                    <li><button onClick={() => handleRecordDelete(data.id)} className='bg-red-500 ml-5 py-1 px-3 text-white rounded cursor-pointer'>Delete</button></li>
                                </ul>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
