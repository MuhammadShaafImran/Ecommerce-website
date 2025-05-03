import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';

const NewArrivals = () => {
  const newItems = [
    {
      id: 1,
      title: "ASUS ROG Swift OLED 27",
      price: 799.99,
      category: "Monitors",
      imageUrl: "../../media/test-game.jpg",
      discount: null
    },
    {
      id: 2,
      title: "HyperX Cloud Alpha Wireless",
      price: 159.99,
      originalPrice: 199.99,
      category: "Audio",
      imageUrl: "../../media/test-game.jpg",
      discount: 15
    },
    {
      id: 3,
      title: "Corsair K100 RGB Mechanical Keyboard",
      price: 229.99,
      category: "Peripherals",
      imageUrl: "../../media/test-game.jpg",
      discount: null
    },
    {
      id: 4,
      title: "Secretlab TITAN Evo 2022 Gaming Chair",
      price: 499.99,
      category: "Furniture",
      imageUrl: "../../media/test-game.jpg",
      discount: null
    }
  ];

  return (
    <div className="w-full py-16 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-6">
          {Array(11).fill(0).map((_, i) => (
            <div 
              key={`col-${i}`} 
              className="absolute top-0 bottom-0 w-px bg-purple-500/10" 
              style={{ 
                left: `${(i / 10) * 100}%`,
                opacity: i % 2 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
          {Array(7).fill(0).map((_, i) => (
            <div 
              key={`row-${i}`} 
              className="absolute left-0 right-0 h-px bg-purple-500/10" 
              style={{ 
                top: `${(i / 6) * 100}%`,
                opacity: i % 2 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
        </div>

        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
            mixBlendMode: 'screen'
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center mb-2">
              <div className="p-2 bg-purple-600/20 rounded-lg mr-3">
                <Sparkles size={24} className="text-purple-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-white">New</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Arrivals</span>
              </h2>
            </div>
            
            <p className="text-gray-400 max-w-lg mt-2 text-lg">
              The latest cutting-edge gaming tech to elevate your gameplay
            </p>
          </div>
          
          <a 
            href="#all-new-items" 
            className="mt-4 md:mt-0 px-6 py-3 bg-purple-600/20 hover:bg-purple-500/30 border border-purple-500/40 hover:border-purple-400 text-purple-300 hover:text-purple-200 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 group"
          >
            View All
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newItems.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* New Arrivals Badge */}
        <div className="absolute top-6 right-6 -rotate-12 md:block hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-purple-500/20 flex items-center">
            <Sparkles size={12} className="mr-1" />
            JUST ARRIVED
          </div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  );
};

export default NewArrivals;