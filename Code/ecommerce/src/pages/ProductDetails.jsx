import { useState } from 'react';

export default function ProductDetail() {
  const [selectedWeight, setSelectedWeight] = useState('Medium');
  const [selectedSize, setSelectedSize] = useState('15');
  const [selectedFlavor, setSelectedFlavor] = useState('Hydrogen');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const productImages = [
    "/api/placeholder/300/600", // Main image (red bottle)
    "/api/placeholder/300/600", // Blue variant
    "/api/placeholder/300/600", // Black variant
    "/api/placeholder/300/600", // Another red variant
  ];

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images Section */}
        <div className="w-full md:w-1/2">
          <div className="flex md:flex-row flex-col-reverse gap-4">
            {/* Thumbnail Images */}
            <div className="flex md:flex-col flex-row gap-2 md:w-24">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`border rounded-lg cursor-pointer p-2 ${activeImage === index ? 'border-gray-800' : 'border-gray-200'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`Product thumbnail ${index + 1}`} 
                    className="w-full h-auto object-contain aspect-square"
                  />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 border rounded-lg p-8 bg-gray-50">
              <img 
                src={productImages[activeImage]} 
                alt="Nitrous oxide cracker antifreeze rubber bottle" 
                className="mx-auto w-full max-h-96 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nitrous oxide cracker antifreeze rubber bottle</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-gray-300">★</span>
            </div>
            <span className="ml-2 text-gray-600">4.5/5</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold mr-3">$260</span>
            <span className="text-xl text-gray-400 line-through mr-3">$300</span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium">-40%</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">
            A very nice feature is that this cracker can be used for a long time and continuously. This can of course be a great advantage at a party or party where nitrous oxide is used and consumed intensively.
          </p>
          
          {/* Weight Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Weight</h3>
            <div className="flex flex-wrap gap-2">
              {['Heavy', 'Light', 'Medium', 'Extra Heavy'].map((weight) => (
                <button
                  key={weight}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedWeight === weight 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedWeight(weight)}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Choose Size</h3>
            <div className="flex flex-wrap gap-2">
              {['12', '14', '15', '16'].map((size) => (
                <button
                  key={size}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedSize === size 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Flavor Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Flavors</h3>
            <div className="flex flex-wrap gap-2">
              {['Combustible', 'Butane', 'Hydrogen'].map((flavor) => (
                <button
                  key={flavor}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedFlavor === flavor 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedFlavor(flavor)}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <button 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={handleDecreaseQuantity}
              >
                −
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
            
            <button className="flex-1 bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>
          
          {/* Additional Information */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.66675L12.575 6.88341L18.3333 7.72508L14.1667 11.7834L15.15 17.5167L10 14.8167L4.85 17.5167L5.83333 11.7834L1.66667 7.72508L7.425 6.88341L10 1.66675Z" fill="#FFC107"/>
              </svg>
              <span className="text-gray-700">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18.3334C14.6024 18.3334 18.3333 14.6024 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 10 1.66675C5.39763 1.66675 1.66667 5.39771 1.66667 10.0001C1.66667 14.6024 5.39763 18.3334 10 18.3334Z" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 5.83325V9.99992L12.5 12.4999" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-700">In stock - ships within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 8.33325H2.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 8.33325V15.8333C17.5 16.2753 17.3244 16.6992 17.0118 17.0118C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.72464 17.4999 3.30072 17.3243 2.98816 17.0118C2.67559 16.6992 2.5 16.2753 2.5 15.8333V8.33325" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.66667 8.33325V4.16659C6.66667 3.50354 6.93006 2.86764 7.3989 2.3988C7.86774 1.92997 8.50363 1.66659 9.16667 1.66659H10.8333C11.4964 1.66659 12.1323 1.92997 12.6011 2.3988C13.0699 2.86764 13.3333 3.50354 13.3333 4.16659V8.33325" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-gray-700">30-day return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}