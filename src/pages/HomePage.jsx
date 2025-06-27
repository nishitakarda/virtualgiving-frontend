import NavBar from '../components/HomeNavbar';
import ImageCarousel from '../components/ImagesCarousel';
import ImpactMetrics from '../components/ImpactMetrices';

const HomePage = () => {
 
  return (
    <div className='flex flex-col items-center gap-4 grow'>
      <NavBar />
      <ImageCarousel />
      <ImpactMetrics />
      <footer className='py-4 bg-black/30 w-full text-center'>
        &copy; Copyright 2025 - Virtual Giving & Volunteering 
      </footer>
    </div>
  )
}

export default HomePage