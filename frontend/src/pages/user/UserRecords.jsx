import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar'
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserRecords() {
    const [category, setCategory] = useState("");
    const [allTypes, setAllTypes] = useState("");
    const [range, setRange] = useState("All");
    const [allRecords, setAllRecords] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const loadRecords = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://127.0.0.1:8000/api/loadRecords?page=${currentPage}&category=${encodeURIComponent(category)}&date=${encodeURIComponent(range)}&types=${encodeURIComponent(allTypes)}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }
            );

            const data = await res.json();

            if (!res.ok) {
                console.log(data.errors || data.message);
                return;
            }
            console.log(data.data);
            setAllRecords(data.data);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        }

        loadRecords();

    }, [range, category, allTypes, currentPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [range, category, allTypes]);

    const handleRecordDelete = async (recordId) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`http://127.0.0.1:8000/api/deleteRecord/${recordId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data.errors || data.message);
            return;
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
                    
                    {/* Header */}
                    <div className='p-5'>
                        <p className='text-xl font-semibold'>My Records</p>
                        <p className='text-gray-500'>View and manage all your income and expense Records</p>
                    </div>

                    {/* Filters */}
                    <div className='flex justify-between mx-5 p-3 rounded shadow-md'>
                        
                        <div className='flex gap-3 items-center rounded bg-gray-200 p-1'>
                            <Search size={15} />
                            <input type='text' placeholder='Search records' className='focus:outline-none bg-transparent' />
                        </div>

                        <select value={allTypes} onChange={(e) => setAllTypes(e.target.value)} className='border rounded p-1'>
                            <option value="">All Types</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expenses</option>
                        </select>

                        <select value={category} onChange={(e) => setCategory(e.target.value)} className='border rounded p-1'>
                            <option value="">All Categories</option>
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

                        <select
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            className='border rounded p-1'
                        >
                            <option value="All">All Time</option>
                            <option value={new Date().getMonth() + 1}>
                                {new Date().toLocaleString('default', { month: 'long' })}
                            </option>
                            <option value={new Date().getMonth()}>
                                {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' })}
                            </option>
                        </select>

                        <div className='flex items-center bg-gray-200 px-4 rounded'>
                            <Filter size={15} />
                            <button>Filter</button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className='m-5 shadow-lg text-gray-500'>
                        <ul className='grid grid-cols-6 p-3 bg-gray-200 rounded'>
                            <li>Date</li>
                            <li>Type</li>
                            <li>Category</li>
                            <li>Amount</li>
                            <li>Notes</li>
                            <li>Actions</li>
                        </ul>

                        {allRecords?.map((data) => (
                            <ul key={data.id} className='grid grid-cols-6 m-5'>
                                <li>{data.date}</li>
                                <li className={`${data.type === "Income" ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'} w-[60%] rounded px-3 py-1`}>
                                    {data.type}
                                </li>
                                <li>{data.category}</li>
                                <li className={`${data.type === "Income" ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                                    {data.amount}
                                </li>
                                <li>{data.notes}</li>
                                <li>
                                    <button
                                        onClick={() => handleRecordDelete(data.id)}
                                        className='bg-red-500 px-3 py-1 text-white rounded'
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        ))}
                    </div>

                    {/* ✅ Pagination Buttons */}
                    <div className='flex justify-center gap-5 mb-5'>
                        <button
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={currentPage === 1}
                            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                        >
                            Previous
                        </button>

                        <span className='px-4 py-2'>
                            Page {currentPage} of {lastPage}
                        </span>

                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage === lastPage}
                            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}