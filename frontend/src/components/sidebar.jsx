import React, { useState } from 'react';
import { LayoutDashboard, User, Settings, Wallet, FileText, LogOut, Menu } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const data = await res.json();

    if (data.message === "Logout Successfull") {
      navigate('/login');
    }
  };

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className='md:hidden'>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-gray-800 text-white
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
          flex flex-col justify-between z-50
        `}
      >
        {/* 🔹 Top Section */}
        <div>
          <p className="text-center text-xl font-semibold my-5">
            {role === "admin" ? "Admin Panel" : "User Dashboard"}
          </p>

          <p className="ml-6 mb-3 text-sm text-gray-300">Platform</p>

          <ul className="flex flex-col gap-2 text-sm font-medium">
            {role === "admin" ? (
              <>
                <li className="flex items-center gap-2 px-6 py-2 hover:bg-blue-900 cursor-pointer">
                  <LayoutDashboard size={18} /> Dashboard
                </li>
                <li className="flex items-center gap-2 px-6 py-2 hover:bg-blue-900 cursor-pointer">
                  <User size={18} /> Users
                </li>
                <li className="flex items-center gap-2 px-6 py-2 hover:bg-blue-900 cursor-pointer">
                  <Wallet size={18} /> Financial Records
                </li>
                <li className="flex items-center gap-2 px-6 py-2 hover:bg-blue-900 cursor-pointer">
                  <FileText size={18} /> Reports
                </li>
                <li className="flex items-center gap-2 px-6 py-2 hover:bg-blue-900 cursor-pointer">
                  <Settings size={18} /> Settings
                </li>
              </>
            ) : (
              <>
                <NavLink
                  to="/admin-dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 hover:bg-blue-900 transition ${
                      isActive ? "bg-blue-900" : ""
                    }`
                  }
                >
                  <LayoutDashboard size={18} /> Dashboard
                </NavLink>

                <NavLink
                  to="/user/records"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 hover:bg-blue-900 transition ${
                      isActive ? "bg-blue-900" : ""
                    }`
                  }
                >
                  <User size={18} /> My Records
                </NavLink>

                <NavLink
                  to="/user/add-records"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 hover:bg-blue-900 transition ${
                      isActive ? "bg-blue-900" : ""
                    }`
                  }
                >
                  <Wallet size={18} /> Add Records
                </NavLink>

                <NavLink
                  to="/user/my-reports"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 hover:bg-blue-900 transition ${
                      isActive ? "bg-blue-900" : ""
                    }`
                  }
                >
                  <FileText size={18} /> My Reports
                </NavLink>

                <NavLink
                  to="/user/setting"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-2 hover:bg-blue-900 transition ${
                      isActive ? "bg-blue-900" : ""
                    }`
                  }
                >
                  <Settings size={18} /> Settings
                </NavLink>
              </>
            )}
          </ul>
        </div>

        {/* 🔹 Bottom Section */}
        <div
          className="flex items-center gap-2 px-6 py-4 cursor-pointer hover:bg-red-600"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <p>Logout</p>
        </div>
      </div>
    </>
  );
}