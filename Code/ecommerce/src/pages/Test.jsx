import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, QuoteIcon, Star, CheckCircle } from 'lucide-react';

export default function ProductReviews() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviewsFilter, setReviewsFilter] = useState('latest');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewsContainerRef = useRef(null);
  
  const tabs = [
    { id: 'details', label: 'Product Details' },
    { id: 'reviews', label: 'Rating & Reviews' },
    { id: 'additional', label: 'Additional Information' },
  ];
  
  const reviews = [
    {
      id: 1,
      name: 'Alex M',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      text: 'It was my first time trying nitrous oxide for a minor surgery. The calming effect was immediate, and it helped ease my anxiety completely!',
      date: '2025-03-15'
    },
    {
      id: 2,
      name: 'Emily S',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      text: 'I couldn\'t stop laughing during my first experience with laughing gas. It turned a nerve-wracking visit into something I\'d almost call fun!',
      date: '2025-03-10'
    },
    {
      id: 3,
      name: 'Chris B',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      text: 'I couldn\'t stop laughing during my first experience with laughing gas. It turned a nerve-wracking visit into something I\'d almost call fun!',
      date: '2025-02-28'
    },
    {
      id: 4,
      name: 'Sarah T',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      text: 'The dental assistant was great at explaining how nitrous oxide works. Made my wisdom tooth extraction much more bearable!',
      date: '2025-02-15'
    },
    {
      id: 5,
      name: 'Michael D',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      text: 'After being anxious about dental procedures for years, nitrous oxide changed my experience completely. Will definitely request it again.',
      date: '2025-01-28'
    },
    {
      id: 6,
      name: 'Jessica L',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      text: 'The relaxation from the laughing gas was exactly what I needed. My dentist adjusted the level perfectly for my comfort.',
      date: '2025-01-12'
    },
  ];

  // Product details content
  const productDetails = {
    name: "Medical Grade Nitrous Oxide System",
    description: "Our state-of-the-art nitrous oxide delivery system provides safe and effective anxiety relief for dental and minor surgical procedures. The system features precise control settings, allowing practitioners to administer the optimal amount for each patient's needs.",
    features: [
      "FDA-approved sedation system",
      "Digital flow monitoring and control",
      "Automatic emergency shutoff",
      "Silent operation for patient comfort",
      "Quick-connect ports for easy setup",
      "Compatible with standard O2 delivery systems"
    ],
    usage: "Designed for use by licensed medical professionals in clinical settings. The system should be operated only by trained personnel following appropriate protocols for patient monitoring and care."
  };

  // Additional information content
  const additionalInfo = {
    technicalSpecs: [
      { label: "Flow Rate Range", value: "0.5 - 10 L/min" },
      { label: "Mixture Ratio", value: "20-70% N2O / O2" },
      { label: "Tank Capacity", value: "Standard E-cylinder compatible" },
      { label: "Power Requirements", value: "110-240V, 50-60Hz" },
      { label: "Dimensions", value: "14\" × 12\" × 8\" (35.6 × 30.5 × 20.3 cm)" },
      { label: "Weight", value: "8.2 lbs (3.7 kg)" }
    ],
    warranty: "3-year limited manufacturer warranty covering parts and labor",
    certification: "ISO 13485, CE Mark, FDA Class II Medical Device",
    support: "24/7 technical support hotline available for licensed practitioners"
  };
  
  // Rotate through reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [reviews.length]);
  
  const handlePrevious = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };
  
  const handleNext = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  // Calculate reviews to display in the circular carousel
  const getVisibleReviews = () => {
    let visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentReviewIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id 
                  ? 'text-gray-800 border-b-2 border-gray-800' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'details' && (
          <div className="py-4">
            <h3 className="text-xl font-semibold mb-4">{productDetails.name}</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">{productDetails.description}</p>
            </div>
            
            <h4 className="text-lg font-medium mb-3">Key Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {productDetails.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="text-lg font-medium mb-3">Intended Usage</h4>
            <p className="text-gray-700 mb-4">{productDetails.usage}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-blue-800 text-sm">
                <strong>Medical Advisory:</strong> This product must be used under proper medical supervision in accordance with local regulations and best practices.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                All Reviews <span className="text-sm text-gray-500">({reviews.length})</span>
              </h3>
              
              <div className="relative">
                <button
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm flex items-center"
                  onClick={() => setReviewsFilter(reviewsFilter === 'latest' ? 'highest' : 'latest')}
                >
                  {reviewsFilter === 'latest' ? 'Latest' : 'Highest Rated'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Reviews Carousel with Horizontal Animation */}
            <div className="relative overflow-hidden">
              <div 
                ref={reviewsContainerRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentReviewIndex * (100 / 3)}%)`,
                  width: `${(reviews.length / 3) * 100}%`
                }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="w-1/3 flex-shrink-0 px-3"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <img
                            src={review.avatar}
                            alt={`${review.name} avatar`}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <div className="text-gray-800">
                          <QuoteIcon className="h-8 w-8 opacity-50" />
                        </div>
                      </div>
                      
                      <div className="mb-2 flex">
                        {renderStars(review.rating)}
                      </div>
                      
                      <p className="text-gray-600 text-sm">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={handlePrevious}
                className="mx-1 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={handleNext}
                className="mx-1 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
              >
                <ChevronLeft className="h-5 w-5 transform rotate-180" />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-4">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 w-2 h-2 rounded-full ${
                    index === currentReviewIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentReviewIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'additional' && (
          <div className="py-4">
            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
            
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <table className="w-full">
                <tbody>
                  {additionalInfo.technicalSpecs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium w-1/3">{spec.label}</td>
                      <td className="px-4 py-3">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium mb-2">Warranty Information</h4>
                <p className="text-gray-700">{additionalInfo.warranty}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-lg font-medium mb-2">Certifications</h4>
                <p className="text-gray-700">{additionalInfo.certification}</p>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium mb-2">Support</h4>
              <p className="text-gray-700">{additionalInfo.support}</p>
              
              <div className="mt-4 bg-green-50 p-3 rounded-md">
                <p className="text-sm text-green-800">
                  For technical questions or troubleshooting, please have your device serial number ready when contacting support.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-2">Downloads</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  User Manual (PDF)
                </li>
                <li className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Quick Start Guide (PDF)
                </li>
                <li className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Maintenance Schedule (PDF)
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}