// components/home/HeroBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroBanner = () => {
  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The Rise Of Specialized Gaming Controllers
          </h1>
          <p className="text-gray-600 mb-6 md:pr-12">
            Enhance your gaming experience with our premium controllers, designed for precision, comfort and durability.
          </p>
          <Button className='px-[2.5rem] py-[1rem]'>
            SHOP NOW
          </Button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png" 
            alt="Gaming Controller" 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;