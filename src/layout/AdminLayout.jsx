import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FiUsers,
  FiBox,
  FiLogOut,
  FiBarChart2,
  FiMenu,
  FiX
} from "react-icons/fi";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Manage Users", path: "/admin/users", icon: <FiUsers /> },
    { name: "Manage Donations", path: "/admin/donations", icon: <FiBox /> },
    { name: "Reports", path: "/admin/reports", icon: <FiBarChart2 /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); // Or your own logic
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed z-30 lg:static lg:block transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64 bg-white shadow-lg`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 transition ${
                location.pathname === item.path ? "bg-blue-100 font-semibold text-blue-700" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-red-600 hover:text-red-800"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center justify-between bg-white shadow px-4 py-3 border-b">
          <button onClick={() => setSidebarOpen(true)}>
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-blue-600">Admin Panel</h1>
          <span></span> {/* Placeholder to center title */}
        </div>

        {/* Page content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
