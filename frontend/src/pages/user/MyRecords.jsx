import React from 'react'
import Sidebar from '../../components/sidebar'
import Records from '../../assets/records_image.png';

export default function MyRecords() {
    return (
        <div>
            <div className='flex'>
                <Sidebar />
                <div className='w-280 h-160 shadow-lg m-10 rounded'>
                    <div >
                        <p className='p-5 text-xl font-semibold'>Add Records</p>
                    </div>
                    <div className='flex flex-wrap gap-10 ml-5'>
                        <div className='w-[45%]'>
                            <label>Type:</label><br />
                            <select className='py-2 px-2 w-[80%] rounded border border-gray-400 my-2'>
                                <option>Income</option>
                                <option>Expense</option>
                            </select>
                        </div>
                        <div className='w-[45%]'>
                            <label>Amount</label><br />
                            <input type='text' placeholder='Enter Amount' className='py-2 px-2 w-[80%] my-2 rounded border border-gray-400'/>
                        </div>
                        <div className='w-[45%]'>
                            <label>Category</label><br/>
                            <input type='text' placeholder='Category(Rent, food, Bill...)' className='py-2 my-2 px-2 w-[80%] rounded border border-gray-400'/>
                        </div>
                        <div className='w-[45%]'>
                            <label>Date</label><br />
                            <input type='date' className='py-2 px-2 w-[80%] rounded border border-gray-400 my-2'/>
                        </div>
                        <div className='w-[45%]'>
                            <label>Notes</label><br />
                            <textarea rows={4} placeholder='Write Some notes...' className='py-2 px-2 w-[80%] my-2 rounded border border-gray-400'></textarea>
                        </div>
                        <div>
                            <img src={Records} className='h-53 -ml-5'/>
                        </div>
                        
                    </div>
                    <div className='flex gap-10 justify-end mr-40 mt-5'> 
                            <button className=' cursor-pointer px-5 py-2 bg-gray-200 rounded hover:scale-110 transition-all duration-500'>Cancel</button>
                            <button className='cursor-pointer text-white bg-blue-500 px-5 py-2 rounded hover:scale-110 transition-all duration-500'>Add Records</button>
                        </div>
                </div>
            </div>
        </div>
    )
}