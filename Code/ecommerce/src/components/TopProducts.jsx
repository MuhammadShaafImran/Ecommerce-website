import React from 'react';
import { ChevronRight, Crown} from 'lucide-react';
import ProductCard from './ProductCard';

const BestSellers = () => {
  const topSellers = [
    {
      id: 1,
      title: "Razer DeathAdder V3 Pro",
      price: 129.99,
      category: "Peripherals",
      imageUrl: "../../media/test-game.jpg",
      discount: null
    },
    {
      id: 2,
      title: "SteelSeries Arctis Nova Pro",
      price: 199.99,
      originalPrice: 249.99,
      category: "Audio",
      imageUrl: "../../media/test-game.jpg",
      discount: 20
    },
    {
      id: 3,
      title: "Logitech G Pro X Mechanical Keyboard",
      price: 129.99,
      category: "Peripherals",
      imageUrl: "../../media/test-game.jpg",
      discount: null
    },
    {
      id: 4,
      title: "NVIDIA RTX 4070 Gaming GPU",
      price: 599.99,
      category: "Hardware",
      imageUrl: "../../media/test-game.jpg",
      discount: null
    }
  ];

  return (
    <div className="w-full py-16 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array(9).fill(0).map((_, i) => (
            <div 
              key={`col-${i}`} 
              className="absolute top-0 bottom-0 w-px bg-blue-500/10" 
              style={{ 
                left: `${(i / 8) * 100}%`,
                opacity: i % 2 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
          {Array(9).fill(0).map((_, i) => (
            <div 
              key={`row-${i}`} 
              className="absolute left-0 right-0 h-px bg-blue-500/10" 
              style={{ 
                top: `${(i / 8) * 100}%`,
                opacity: i % 2 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
        </div>
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
            mixBlendMode: 'screen'
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center mb-2">
              <div className="p-2 bg-blue-600/20 rounded-lg mr-3">
                <Crown size={24} className="text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-white">Best</span>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Sellers</span>
              </h2>
            </div>
            
            <p className="text-gray-400 max-w-lg mt-2 text-lg">
              Premium gaming gear trusted by professional esports players worldwide
            </p>
          </div>
          
          <a 
            href="#all-bestsellers" 
            className="mt-4 md:mt-0 px-6 py-3 bg-blue-600/20 hover:bg-blue-500/30 border border-blue-500/40 hover:border-blue-400 text-blue-300 hover:text-blue-200 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300 group"
          >
            View All
            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topSellers.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;