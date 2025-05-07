// components/home/ProductShowcase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const ProductShowcase = ({ product, imagePosition }) => {
  if (!product) return null;
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;
  console.log("ProductShowcase imageUrl:", imageUrl);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
          <div className="md:w-3/5">
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/5">
            <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-2xl font-bold text-red-500 mb-6">${product.price}</div>
            <div className="flex space-x-4">
              <Button variant="primary">Add to Cart</Button>
              <Link to={`/product/${product.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductShowcase;