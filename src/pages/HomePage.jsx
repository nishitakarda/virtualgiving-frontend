import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import ImageCarousel from '../components/ImagesCarousel';
import ImpactMetrics from '../components/ImpactMetrices';

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
    <div className='flex flex-col items-center gap-4 grow'>
      <ImageCarousel />
      <ImpactMetrics />
    </div>
  )
}

export default HomePage