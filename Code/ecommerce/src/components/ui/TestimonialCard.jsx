// components/ui/TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  const { name, image, quote, location } = testimonial;
  
  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <div className="text-sm text-gray-500">{location}</div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  );
};

export default TestimonialCard;