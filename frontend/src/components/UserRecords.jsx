import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Receipt, Landmark, ArrowDownLeft } from 'lucide-react';
import { useRecord } from '../context/RecordContext';
import axios from 'axios';
export default function UserRecords() {
    const {adminData, setAdminData, record, setRecord} = useRecord();
    
    const role = localStorage.getItem('role');
  
  return (
    <div className='flex gap-5 mt-5 text-white'>
              <div className='flex items-center gap-5 flex-1 bg-blue-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
                <ArrowDownLeft size={35} color='white' />
                <div>
                  <p>Total Income</p>
                  <p className='text-2xl'>+{role === 'admin' ? adminData?.info?.income : record?.totals?.income}</p>
                </div>
              </div>
              <div className='flex flex-1 gap-5 items-center bg-green-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
                <ArrowUpRight size={35} color='white' />
                <div>
                  <p>Total Expense</p>
                  <p className='text-2xl'>-{role === 'admin' ? adminData?.info?.expense : record?.totals?.expense}</p>
                </div>
              </div>
              <div className=' flex flex-1 gap-5 items-center bg-orange-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
                <Landmark size={35} color='white' />
                <div>
                  <p>Net Balance</p>
                  <p className='text-2xl'>{role === 'admin'
                    ? adminData?.info?.balance
                    : record?.totals?.balance}</p>
                </div>
              </div>
              <div className='flex flex-2 items-center gap-5 bg-purple-500 rounded p-5 shadow-xl hover:scale-110 transition-all duration-500 cursor-pointer'>
                <Receipt size={35} color='white' />
                <div>
                  <p>Total Records</p>
                  <p className='text-2xl'>+{role === 'admin' ? adminData?.info?.totalRecords : record?.totalRecords}</p>
                </div>
              </div>
            </div>
  )
}
