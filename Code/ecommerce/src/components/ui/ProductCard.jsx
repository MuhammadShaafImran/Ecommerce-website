// components/ui/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, horizontal = false }) => {
  const { id, title, price, image, rating, oldPrice } = product;

  // Calculate discount percentage if oldPrice exists
  const discountPercentage = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : null;

  return (
    <div className={`group ${horizontal ? 'flex gap-4' : ''}`}>
      <Link 
        to={`/product/${id}`} 
        className={`block relative rounded overflow-hidden ${horizontal ? 'w-1/3' : 'mb-3'}`}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        )}
      </Link>
      
      <div className={horizontal ? 'w-2/3' : ''}>
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-gray-800 hover:text-red-500 transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center mt-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">${price.toFixed(2)}</span>
            {oldPrice && (
              <span className="text-gray-500 line-through text-sm">${oldPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;