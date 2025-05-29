import React from 'react'
import NavBar from './HomeNavbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-white">
      <div className="flex-1 flex flex-col">
        <div className="grow flex flex-col overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout
