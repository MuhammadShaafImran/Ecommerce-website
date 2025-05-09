
// components/ui/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { name, image, id } = category;
  
  return (
    <Link 
      to={`/category/${name}`}
      className="block relative rounded overflow-hidden group"
    >
      <div className="aspect-video bg-gray-100 rounded overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition">
        <h3 className="text-white font-medium text-lg text-center px-3">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;