import React, { useState, useEffect } from 'react';

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
    <div className="relative flex w-full max-h-[50vh] mx-auto overflow-hidden shadow-lg">
      <div className='absolute grow w-[100%] h-[100%] bg-black/60 z-10 flex flex-col gap-4 items-center justify-center text-white'>
        <p className='text-2xl md:text-5xl font-bold '> Virtual Giving & Volunteering</p>
        <p className='max-w-[60%]'>Volunteer your skills or support with donations - all online</p>
        <div className='flex gap-4 mt-8 md:mt-12 w-full mx-auto md:w-xl'>
          <button className='hover:bg-white hover:text-black border w-full border-white text-sm p-4 rounded'>Volunteer</button>
          <button className='hover:bg-white hover:text-black border w-full border-white text-sm p-4 rounded'>Donate</button>
          <button className='hover:bg-white hover:text-black border w-full border-white text-sm p-4 rounded'>Get Help</button>
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
