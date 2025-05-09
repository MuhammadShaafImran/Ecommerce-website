// components/ui/ProductCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { CartContext } from '../../contexts/CartContext';

const calculateOldPrice = (price) => {
  return price * (1 + Math.random() * 0.2); // Random old price for demo
}

const ProductCard = ({ product, horizontal = false }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  const { id, name, price, images, rating } = product;
  const oldPrice = calculateOldPrice(price);
  const singleimage = images.length > 0 ? images[0] : images; // Get the first image if available
  // Calculate discount percentage if oldPrice exists
  const discountPercentage = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : null;
    
  // console.log('ProductCard', product);

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className={`group flex-shrink-0 w-72 mx-6 ${horizontal ? 'flex gap-4 w-full' : ''}`}>
      <Link 
        to={`/product/${id}`} 
        className={`block relative rounded overflow-hidden h-64 ${horizontal ? 'w-1/3' : 'mb-3'} group`}
      >
        <img 
          src={singleimage ? singleimage.url : '/placeholder.jpg'} 
          alt={singleimage ? singleimage.alt_text : 'Product Image'} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-lg font-medium flex items-center gap-2">
            View Details <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>
      
      <div className={horizontal ? 'w-2/3' : ''}>
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-gray-800 hover:text-red-500 transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
              />
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">${price}</span>
            {oldPrice && (
              <span className="text-gray-500 line-through text-sm">${oldPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;