import { useEffect, useState } from 'react';
import { FaCoins, FaHandshake } from 'react-icons/fa';
import { MdEngineering } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const images = [
  '/background1.jpg',
  '/background2.png',
  '/background3.jpeg',
];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] max-h-[700px] mx-auto overflow-hidden  shadow-2xl">
      {/* Overlay content */}
      <div className="absolute inset-0 z-10 bg-black/60 flex flex-col gap-4 items-center justify-center text-white p-4 text-center">
        <h1 className="text-2xl md:text-5xl font-bold drop-shadow-lg">Virtual Giving & Volunteering</h1>

        <div className="flex flex-wrap gap-6 md:gap-12 justify-center mt-6">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-black/10 border-2 border-white p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full">
              <FaHandshake className="text-2xl md:text-4xl" />
            </div>
            <p>Mentorships</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-black/10 border-2 border-white p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full">
              <MdEngineering className="text-2xl md:text-4xl" />
            </div>
            <p>Internships</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-black/10 border-2 border-white p-4 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full">
              <FaCoins className="text-2xl md:text-4xl" />
            </div>
            <p>Donations</p>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-sm mt-6">
          <Link to="/register" className="flex-1 border border-white text-white hover:bg-white hover:text-black py-2 md:py-3 rounded transition">
            Signup
          </Link>
          <Link to="/login" className="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2 md:py-3 rounded transition">
            Login
          </Link>
        </div>
      </div>

      {/* Image Slider */}
      <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={prevSlide} className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition">
        <IoChevronBack className="text-2xl text-black" />
      </button>
      <button onClick={nextSlide} className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 transition">
        <IoChevronForward className="text-2xl text-black" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${index === current ? 'bg-teal-500 scale-125' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
