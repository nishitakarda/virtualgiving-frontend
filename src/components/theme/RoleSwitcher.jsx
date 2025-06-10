import React, { useState } from 'react';

const roles = ['STUDENT', 'ORGANIZATION', 'ALUMNI'];

const RoleSwitcher = ({ onChange }) => {
  const [activeRole, setActiveRole] = useState('STUDENT');

  const handleSwitch = (role) => {
    setActiveRole(role);
    if (onChange) onChange(role); // callback to parent if needed
  };

  return (
    <div className="inline-flex dark mx-auto w-fit mb-4 rounded-full p-1 shadow-md">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => handleSwitch(role)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all
            ${activeRole === role
              ? 'bg-teal-600 text-white shadow'
              : 'text-gray-500 '}`}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSwitcher;
