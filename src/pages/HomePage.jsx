import { useEffect, useState } from 'react';
import NavBar from '../components/HomeNavbar';
import ImageCarousel from '../components/ImagesCarousel';
import ImpactMetrics from '../components/ImpactMetrices';
import axiosInstance from '../utils/axiosInstance';

const HomePage = () => {
  const [user, setUser] = useState(null);

  const getData = async () => {
    const res = await axiosInstance.get('/user/me');
    setUser(res.data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className='flex flex-col items-center gap-4 grow'>
      <NavBar />
      <ImageCarousel />
      <ImpactMetrics />
    </div>
  )
}

export default HomePage