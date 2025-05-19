import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const HomePage = () => {
  const [user, setUser] = useState(null);

  const getData = async () =>{
 const res = await axiosInstance.get('/user/me');
    console.log(res.data);
    setUser(res.data);
  }
  useEffect(()=>{
   getData();
  },[]);
  return (
    <div className='flex flex-col items-center gap-4 justify-center grow'>
     <div className='text-2xl'>Welcome <span className='text-sky-500'>{user?.name}</span> <span className='text-sm'>({user?.role})</span> </div>
    </div>
  )
}

export default HomePage