import React from 'react'
import Sidebar from '../../components/sidebar'

export default function MyRecords() {
  return (
    <div>
        <div className='flex'>
            <Sidebar />
            <div>
<div className='w-280 h-160 shadow-lg m-10 rounded'>
<p className='p-5 text-xl font-semibold'>Add Records</p>
</div>
            </div>
        </div>
    </div>
  )
}