import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const InternshipTopbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const name = localStorage.getItem('name') ||/* deafault for now*/ 'Nishita';
  const email = localStorage.getItem('email') || /* deafault for now*/'nishita@example.com';

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleManageAccount = () => {
    navigate('/student-profile');
  };

  const handleAppliedInternships = () => {
    navigate('/applied-internships'); 
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white shadow flex justify-between items-center px-6 py-4 z-50 relative">
      <div className="text-xl font-semibold text-sky-700">
        Virtual Giving and Volunteering
      </div>

      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <span
            onClick={handleAppliedInternships}
            className="text-sm text-sky-600 font-medium hover:underline hover:text-sky-700 cursor-pointer"
        >
            Applied Internships
        </span>
        <div className="h-5 w-px bg-black" />

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleDropdownToggle}
        >
          <span className="text-gray-700 font-medium">Hi, {name}</span>
          <FaUserCircle className="text-3xl text-gray-700" />
        </div>

        {showDropdown && (
          <div className="absolute right-0 top-14 w-56 bg-white border rounded shadow-lg z-50">
            <div className="px-4 py-3">
              <div className="text-sm font-semibold text-gray-800">{name}</div>
              <div className="text-xs text-gray-500">{email}</div>
            </div>
            <hr />
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleManageAccount}
            >
              Manage Account
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipTopbar;
