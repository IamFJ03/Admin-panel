import React from 'react';
import Sidebar from "../components/sidebar";

import { useLocation } from 'react-router-dom';
export default function UserDashboard() {
    const location = useLocation();
    const name = location.state?.name;
    const role = location.state?.role;
  return (
    <div>
      <div className='flex'>
      <Sidebar role={role}/>
      <p>Welcome, {name}</p>
      </div>
    </div>
  )
}
