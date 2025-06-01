// components/ui/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { name, image, id } = category;
  
  return (
    <Link 
      to={`/category/${name}`}
      className="block relative rounded-xl overflow-hidden group"
    >
      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <h3 className="text-white font-semibold text-lg text-center">
            {name}
          </h3>
          <div className="w-12 h-0.5 bg-red-500 mx-auto mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;