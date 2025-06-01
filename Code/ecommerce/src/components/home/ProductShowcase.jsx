// components/home/ProductShowcase.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Star } from 'lucide-react';
import { CartContext } from '../../contexts/CartContext';

const ProductShowcase = ({ product, imagePosition }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;
  
  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : null;
  const rating = product.rating?.average || 0;
  const reviewCount = product.rating?.count || 0;

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
          <div className="md:w-3/5 group">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={imageUrl} 
                alt={product.name} 
                className="w-full h-[500px] object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              {product.specifications && (
                <div className="absolute inset-0 bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="px-6 py-4 ">
                    <h4 className="font-semibold text-xl mb-4"> Specifications 💫</h4>
                    <ul className="space-y-2">
                      {product.specifications.connectivity && (
                        <li>✨ {product.specifications.connectivity}</li>
                      )}
                      {product.specifications.batterylife && (
                        <li>✨ {product.specifications.batterylife}</li>
                      )}
                      {product.specifications.weight && (
                        <li>✨ {product.specifications.weight}</li>
                      )}

                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-2/5">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  size={20}
                  className={i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
              <span className="ml-2 text-gray-600">({reviewCount} reviews)</span>
            </div>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>
            <div className="mb-8">
              <div className="text-3xl font-bold text-red-500">${product.price.toFixed(2)}</div>
              {product.inventory && (
                <div className="mt-2 text-sm">
                  <span className={product.inventory.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                    {product.inventory.stock > 0 
                      ? `In Stock ` 
                      : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="primary" 
                className="px-8 py-3"
                disabled={!product.inventory || product.inventory.stock <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Link to={`/product/${product.id}`}>
                <Button variant="outline" className="px-8 py-3 text-lg">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;