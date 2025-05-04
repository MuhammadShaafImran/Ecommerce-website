// pages/ProductDetails.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Hardcoded sample products data
  const sampleProducts = [
    {
      id: "1",
      title: "PlayStation 5 DualSense Controller",
      price: 69.99,
      oldPrice: 89.99,
      category: "Controllers",
      rating: 5,
      image: "../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png",
      description: "Experience gaming like never before with the PS5 DualSense Controller. Features haptic feedback, adaptive triggers, and built-in microphone.",
      specifications: {
        connectivity: "Wireless & USB-C",
        batteryLife: "12 hours",
        compatibility: "PS5, PC",
        dimensions: "160 x 66 x 106 mm",
        weight: "280g"
      }
    },
    {
      id: "2",
      title: "Razer BlackShark V2 Pro",
      price: 179.99,
      category: "Headsets",
      rating: 4,
      image: "../../media/test-game.jpg",
      description: "Professional-grade wireless gaming headset with THX Spatial Audio and premium comfort."
    },
    {
      id: "3",
      title: "Logitech G Pro X Superlight",
      price: 149.99,
      category: "Mice",
      rating: 5,
      image: "../../media/test-game.jpg",
      description: "Ultra-lightweight wireless gaming mouse designed for esports professionals."
    },
    {
      id: "4",
      title: "SteelSeries Apex Pro",
      price: 199.99,
      category: "Keyboards",
      rating: 4,
      image: "../../media/test-game.jpg",
      description: "Mechanical gaming keyboard with adjustable actuation and OLED smart display."
    }
  ];

  // Find the product with the matching id
  const product = sampleProducts.find(p => p.id === id) || sampleProducts[0];
  
  // Get related products
  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex text-sm">
          <li className="text-gray-500">
            <Link to="/" className="hover:text-red-500">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500">
            <Link to={`/category/${product.category}`} className="hover:text-red-500">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-medium">{product.title}</li>
        </ol>
      </nav>
      
      {/* Product Detail */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className={`bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${index === 0 ? 'border-red-500' : 'border-transparent'}`}
              >
                <img 
                  src={product.image} 
                  alt={`${product.title} thumbnail ${index+1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          
          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(24 reviews)</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            {product.oldPrice && (
              <span className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          {/* Short Description */}
          <p className="text-gray-600 mb-6">
            {product.description || 'High-quality gaming peripheral designed for professional gamers and enthusiasts. Features premium materials, ergonomic design, and advanced technology for superior performance.'}
          </p>
          
          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l"
                onClick={handleDecrement}
              >
                <Minus size={16} />
              </button>
              <input 
                type="text" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
              />
              <button 
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r"
                onClick={handleIncrement}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="primary" size="large" className="flex-grow">
              Add to Cart
            </Button>
            <button className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
              <Share2 size={20} />
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center">
              <Truck size={18} className="text-red-500 mr-3" />
              <span className="text-gray-600">Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center">
              <RotateCcw size={18} className="text-red-500 mr-3" />
              <span className="text-gray-600">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center">
              <Shield size={18} className="text-red-500 mr-3" />
              <span className="text-gray-600">2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mb-16">
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'description' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'specifications' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`py-3 px-6 font-medium ${activeTab === 'reviews' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (24)
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">
                Experience gaming like never before with our premium gaming peripheral. Designed with professional gamers in mind, this product offers exceptional performance, comfort, and durability.
              </p>
              <p className="text-gray-600 mb-4">
                Featuring advanced technology, ergonomic design, and high-quality materials, this product ensures precision and responsiveness during extended gaming sessions. The sleek, modern aesthetic complements any gaming setup.
              </p>
              <p className="text-gray-600">
                Whether you're a competitive gamer or casual enthusiast, this product will elevate your gaming experience to new heights.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Connectivity</th>
                    <td className="py-3 text-gray-800">Wireless & Wired</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Battery Life</th>
                    <td className="py-3 text-gray-800">Up to 40 hours</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Compatibility</th>
                    <td className="py-3 text-gray-800">PC, Mac, PlayStation, Xbox</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Dimensions</th>
                    <td className="py-3 text-gray-800">15.3 x 10.7 x 4.4 cm</td>
                  </tr>
                  <tr>
                    <th className="py-3 text-gray-600 w-1/3">Weight</th>
                    <td className="py-3 text-gray-800">280g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-800 font-medium">4.6 out of 5</span>
                </div>
                <p className="text-gray-600">Based on 24 reviews</p>
              </div>
              
              {/* Sample Review */}
              <div className="border-t border-gray-200 pt-6 pb-6">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">John D.</h4>
                  <span className="text-gray-500 text-sm">2 weeks ago</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  Absolutely love this product! The build quality is exceptional and the performance exceeds my expectations. Definitely worth the investment for serious gamers.
                </p>
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline">Write a Review</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;