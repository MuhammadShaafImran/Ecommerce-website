// components/ui/NewsCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NewsCard = ({ article }) => {
  const { id, title, excerpt, image, date } = article;
  
  return (
    <div className="group">
      <Link to={`/news/${id}`} className="block rounded overflow-hidden mb-3">
        <img 
          src={image} 
          alt={title} 
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </Link>
      <div className="text-sm text-gray-500 mb-2">{date}</div>
      <Link to={`/news/${id}`}>
        <h3 className="font-medium text-lg text-gray-800 hover:text-red-500 transition-colors mb-2">
          {title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-3">{excerpt}</p>
      <Link 
        to={`/news/${id}`}
        className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
      >
        Read More <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default NewsCard;