import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import { getProductById, getUsersReviewsByProductId, getProductsSortedByRating, getProductSpecificationById } from '../api/product/read';
import { CartContext } from '../contexts/CartContext';
import ProductCard from '../components/ui/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch the product details
        const productData = await getProductById(id);
        // console.log('Product data:', productData);
        // Fetch reviews for this product
        const reviewsData = await getUsersReviewsByProductId(id);
        // console.log('Reviews data:', reviewsData);

        const specificationsData = await getProductSpecificationById(id);
        // console.log('Specifications data:', specificationsData);

        // Fetch all products to find related ones
        const allProducts = await getProductsSortedByRating();
        // console.log('All products:', allProducts);
        
        // Calculate average rating from reviews
        const averageRating = reviewsData.length > 0
          ? reviewsData.reduce((acc, curr) => acc + curr.rating, 0) / reviewsData.length
          : 0;

        // Prepare the product data with images and rating
        const enrichedProduct = {
          ...productData,
          rating: Number(averageRating.toFixed(1))
        };
        
        // Find related products (same category, different ID)
        const related = allProducts
          .filter(p => 
            p.categories.name === productData.categories.name && 
            p.id !== productData.id
          )
          .slice(0, 4);
        
        setProduct(enrichedProduct);
        setReviews(reviewsData);
        setRelatedProducts(related);
        
        setSpecifications( specificationsData.length > 0 ? specificationsData[0]: {});
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProductData();
    }
  }, [id]);
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product, quantity);
      // Reset quantity after adding to cart
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold text-red-500">{error || 'Product not found'}</h2>
        <Link to="/">
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Return to Products
          </button>
        </Link>
      </div>
    );
  }
  
  // Calculate discount if we have old price data (which we don't from the API currently)
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
  
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
            <Link to={`/category/${product.categories.name}`} className="hover:text-red-500">
              {product.categories.name.charAt(0).toUpperCase() + product.categories.name.slice(1)}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-medium">{product.name}</li>
        </ol>
      </nav>
      
      {/* Product Detail */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
            <img 
              src={(product.images && product.images.length > 0) 
                ? product.images[0].url 
                : "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {(product.images && product.images.length > 0) 
              ? product.images.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${index === 0 ? 'border-red-500' : 'border-transparent'}`}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt_text || `${product.name} thumbnail ${index+1}`}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))
              : [...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${index === 0 ? 'border-red-500' : 'border-transparent'}`}
                >
                  <img 
                    src="/placeholder.jpg" 
                    alt={`${product.name} thumbnail ${index+1}`}
                    className="w-full h-16 object-contain"
                  />
                </div>
              ))
            }
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
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
            <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            {discountPercentage && (
              <span className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          
          {/* Short Description */}
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          
          {/* Stock Information */}
          <div className="mb-4">
            <span className={`font-medium ${product.inventory && product.inventory.stock > 0 
              ? 'text-green-500' 
              : 'text-red-500'}`}>
              {product.inventory && product.inventory.stock > 0 
                ? `In Stock (${product.inventory.stock} available)` 
                : 'Out of Stock'}
            </span>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-l"
                onClick={handleDecrement}
                disabled={product.inventory && product.inventory.stock <= 0}
              >
                <Minus size={16} />
              </button>
              <input 
                type="text" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
                disabled={product.inventory && product.inventory.stock <= 0}
              />
              <button 
                className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-r"
                onClick={handleIncrement}
                disabled={product.inventory && product.inventory.stock <= 0}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              className={`flex-grow py-3 px-6 text-white font-medium rounded transition ${
                product.inventory && product.inventory.stock > 0
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handleAddToCart}
              disabled={product.inventory && product.inventory.stock <= 0}
            >
              Add to Cart
            </button>
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
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button 
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'description' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'specifications' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`py-3 px-6 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Category</th>
                    <td className="py-3 text-gray-800">{product.categories.name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Compatibility</th>
                    <td className="py-3 text-gray-800">{specifications.compatibility ? specifications.compatibility : 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Dimensions</th>
                    <td className="py-3 text-gray-800">{specifications.dimensions ? specifications.dimensions : 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Battery Life</th>
                    <td className="py-3 text-gray-800">{specifications.batterylife ? specifications.batterylife : 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Weight</th>
                    <td className="py-3 text-gray-800">{specifications.weight ? specifications.weight : 'N/A'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-gray-600 w-1/3">Stock</th>
                    <td className="py-3 text-gray-800">{product.inventory ? product.inventory.stock : 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
              {reviews.length > 0 ? (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-800 font-medium">{product.rating.toFixed(1)} out of 5</span>
                  </div>
                  <p className="text-gray-600">Based on {reviews.length} reviews</p>
                  
                  {/* Reviews list */}
                  <div className="mt-6 space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="border-t border-gray-200 pt-6 pb-6">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{review.users ? review.users.name : 'Anonymous'}</h4>
                          <span className="text-gray-500 text-sm">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 mb-6">No reviews yet. Be the first to review this product!</p>
              )}
              
              <div className="text-center mt-6">
                <button className="px-6 py-2 border border-red-500 text-red-500 font-medium rounded hover:bg-red-50 transition">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;