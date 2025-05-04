// pages/CategoryPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest'
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Hardcoded sample categories data
  const categories = [
    {
      slug: 'keyboards',
      name: 'Gaming Keyboards',
      description: 'High-performance mechanical keyboards for competitive gaming'
    },
    {
      slug: 'mice',
      name: 'Gaming Mice',
      description: 'Precision gaming mice with advanced sensors and ergonomic designs'
    },
    {
      slug: 'headsets',
      name: 'Gaming Headsets',
      description: 'Immersive audio solutions for the ultimate gaming experience'
    },
    {
      slug: 'controllers',
      name: 'Controllers',
      description: 'Premium gaming controllers for console and PC gaming'
    },
    {
      slug: 'monitors',
      name: 'Gaming Monitors',
      description: 'High refresh rate displays for competitive gaming'
    }
  ];

  // Hardcoded sample products data
  const products = [
    {
      id: "1",
      title: "Razer Huntsman Elite",
      price: 199.99,
      category: "keyboards",
      featured: true,
      image: "../../media/test-game.jpg",
      createdAt: "2025-04-01",
      rating: 4.5
    },
    {
      id: "2",
      title: "Logitech G Pro X Superlight",
      price: 149.99,
      category: "mice",
      featured: true,
      image: "../../media/test-game.jpg",
      createdAt: "2025-04-15",
      rating: 5
    },
    {
      id: "3",
      title: "HyperX Cloud Alpha",
      price: 99.99,
      category: "headsets",
      featured: false,
      image: "../../media/test-game.jpg",
      createdAt: "2025-04-10",
      rating: 4.5
    },
    {
      id: "4",
      title: "PlayStation 5 DualSense",
      price: 69.99,
      category: "controllers",
      featured: true,
      image: "../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png",
      createdAt: "2025-04-20",
      rating: 5
    },
    {
      id: "5",
      title: "ASUS ROG Swift 360Hz",
      price: 799.99,
      category: "monitors",
      featured: true,
      image: "../../media/test-game.jpg",
      createdAt: "2025-04-05",
      rating: 4.8
    },
    {
      id: "6",
      title: "SteelSeries Apex Pro",
      price: 199.99,
      category: "keyboards",
      featured: false,
      image: "../../media/test-game.jpg",
      createdAt: "2025-04-18",
      rating: 4.7
    }
  ];
  
  // Find the category
  const categoryData = categories.find(c => c.slug === category);
  
  // Filter products by category
  const categoryProducts = products.filter(p => p.category === category);
  
  // Sort products
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default: // 'featured'
        return b.featured ? 1 : -1;
    }
  });
  
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
            <Link to="/shop" className="hover:text-red-500">Shop</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-medium">
            {categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1)}
          </li>
        </ol>
      </nav>
      
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <p className="text-gray-600">
          {categoryData?.description || `Browse our collection of high-quality ${category} gaming peripherals.`}
        </p>
      </div>
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <button 
          className="flex items-center px-4 py-2 border border-gray-300 rounded md:hidden w-full justify-between"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <div className="flex items-center">
            <SlidersHorizontal size={18} className="mr-2" />
            <span>Filters</span>
          </div>
          <ChevronDown size={18} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className="md:flex-grow md:mr-4 w-full md:w-auto">
          <div className={`bg-white border border-gray-200 rounded p-4 mb-4 md:mb-0 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="flex items-center mb-4">
              <input 
                type="range" 
                min="0" 
                max="500" 
                className="w-full"
                defaultValue="500"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>$500</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-grow md:flex-grow-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          
          <div className="flex border border-gray-300 rounded">
            <button 
              className={`p-2 ${view === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setView('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-2 ${view === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setView('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Products */}
      {sortedProducts.length > 0 ? (
        <div className={view === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
          : "space-y-6"
        }>
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              horizontal={view === 'list'} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex">
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l bg-gray-100">
            &laquo;
          </button>
          <button className="w-10 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-red-500 text-white">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border-t border-b border-gray-300">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border-t border-b border-gray-300">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r">
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;