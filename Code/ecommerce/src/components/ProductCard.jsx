import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ title, price, originalPrice, category, imageUrl, discount }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-gray-800/50 backdrop-blur-sm text-white rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount badge */}
      {discount && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {discount}% OFF
        </div>
      )}
      
      {/* Quick add button that appears on hover */}
      <div className={`absolute inset-0 bg-gray-900/90 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-10`}>
        <button className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium flex items-center space-x-2 transform hover:scale-105">
          <ShoppingCart size={18} className="transform group-hover/btn:rotate-12 transition-transform" />
          <span>Add to Cart</span>
        </button>
      </div>
      
      {/* Product image */}
      <div className="relative aspect-square bg-gray-900 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80" />
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full uppercase tracking-wider">{category}</span>
          <div className="ml-auto flex">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
              />
            ))}
          </div>
        </div>
        
        <h3 className="text-white font-medium mb-2 line-clamp-2 h-12 group-hover:text-blue-300 transition-colors">{title}</h3>
        
        <div className="flex items-baseline">
          <span className="text-lg font-bold text-white">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;