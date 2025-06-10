import { useEffect, useState } from 'react';
import { FaCoins, FaHandshake } from 'react-icons/fa';
import { MdEngineering } from 'react-icons/md';
import { Link } from 'react-router-dom';

const images = [
  '/background1.jpg',
  '/background2.png',
  '/background3.jpeg',
];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + length) % length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative flex w-full md:max-h-[70vh] mx-auto drop-shadow-2xl overflow-hidden">
      <div className='absolute grow w-[100%] h-[100%] bg-black/60 z-10 flex flex-col gap-4 items-center justify-center text-white'>
        <p className='text-2xl md:text-5xl font-bold '> Virtual Giving & Volunteering</p>

        <div className='flex gap-4 md:gap-12 md:my-8 items-center justify-center'>

          <div className='flex flex-col items-center gap-2'>
            <div className='md:border-4 bg-teal-500/30 p-4 md:w-24 md:h-24 flex items-center justify-center rounded-full'> <FaHandshake className='text-2xl md:text-4xl' /></div>
            Mentorships
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='md:border-4 bg-teal-500/30 p-4 md:w-24 md:h-24  flex items-center justify-center rounded-full'> <MdEngineering className='text-2xl md:text-4xl' /></div>
            Internships
          </div>
          <div className='flex flex-col items-center gap-2'>
            <div className='md:border-4 bg-teal-500/30 p-4 md:w-24 md:h-24  flex items-center justify-center rounded-full'> <FaCoins className='text-2xl md:text-4xl' /></div>
            Donations
          </div>
        </div>

        <div className='flex px-6  gap-6 w-full md:max-w-lg text-center'>
          <Link to="/register"
            className="border w-full border-white text-white hover:bg-white hover:text-black py-2 md:py-3 md:px-6 rounded transition"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="w-full bg-teal-600 text-white hover:bg-teal-500 py-2 md:py-3 md:px-6 rounded transition"
          >
            Login
          </Link>
        </div>
      </div>
      {/* Images */}
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-30 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${index === current ? 'bg-teal-600' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
