import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='shadow-md flex items-center justify-between px-8  py-6'>
      <p>Virtual Giving and Volunteering</p>
      <div className='space-x-4'>
        <Link to='/login' className='border border-sky-500 rounded-full text-sky-500 px-4 py-2'>Login</Link>
        <Link to='/register' className='bg-sky-500 rounded-full text-white px-4 py-2'>Register</Link>
      </div>
    </div>
  )
}

export default NavBar