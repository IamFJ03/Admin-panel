import React from 'react'
import Sidebar from '../../components/sidebar';
import UserRecords from '../../components/UserRecords';
export default function Records() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='shadow-md m-5 flex-3'>
<UserRecords />
      </div>
    </div>
  )
}
