import React from 'react'
import Sidebar from '../../components/sidebar'
import { Search } from 'lucide-react'
export default function UserRecords() {
    return (
        <div>
            <div className='flex w-screen'>
                <Sidebar />
                <div className='w-full m-5 rounded shadow-md'>
                    <div className='p-5'>
                        <p className='text-xl font-semibold'>My Records</p>
                        <p className='text-gray-500'>View and manage all your income and expense Records</p>
                    </div>
                    <div className='flex justify-between mx-5 p-3 rounded shadow-md'>
                        <div className='flex gap-3 items-center rounded bg-gray-200 p-1'>
                            <Search size={15} color='black' />
                              <input type='text' placeholder='Search records' className='focus:outline-none focus:border-gray-200'/>
                        </div>
                        <div>
                            <select>
                                <option></option>
                            </select>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
