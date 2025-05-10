// pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, List, X, Star, Filter, ArrowUpDown, ChevronLeft, ChevronRight
} from 'lucide-react';
import ProductCard from '../../components/ui/ProductCard';
import { 
  getAllCategories,
  getProductsByCategory,
  getProductsSortedByPriceLowToHigh,
  getProductsSortedByPriceHighToLow,
  getNewestProducts
} from '../../api/product/read';

const CategoryDetail = () => {
  const { category } = useParams();
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Get category information
  const categoryData = categories.find(c => c.name?.toLowerCase() === category.toLowerCase());
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsData;

        // Fetch products based on category
        productsData = await getProductsByCategory(category);
        
        // Sort products based on selected option
        switch (sortBy) {
          case 'price-low':
            productsData = await getProductsSortedByPriceLowToHigh();
            break;
          case 'price-high':
            productsData = await getProductsSortedByPriceHighToLow();
            break;
          case 'newest':
            productsData = await getNewestProducts();
            break;
          default:
            // Default sorting is already handled by getProductsByCategory
            break;
        }

        // Filter products by category
        productsData = productsData.filter(product => 
          product.categories && product.categories.name.toLowerCase() === category.toLowerCase()
        );

        // Find max price for range slider
        const highest = Math.max(...productsData.map(p => p.price));
        setMaxPrice(highest > 0 ? highest : 1000);
        if (priceRange === 1000) {
          setPriceRange(highest > 0 ? highest : 1000);
        }

        // Filter by price range
        productsData = productsData.filter(product => product.price <= priceRange);
        
        // Filter by rating if any ratings are selected
        if (selectedRatings.length > 0) {
          productsData = productsData.filter(product => 
            selectedRatings.includes(Math.floor(product.rating || 0))
          );
        }
        
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, sortBy, priceRange, selectedRatings]);

  const handlePriceRangeChange = (e) => {
    setPriceRange(Number(e.target.value));
  };
  
  const toggleRatingFilter = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Generate pagination numbers
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(Math.min(3, totalPages - start)).fill().map((_, idx) => start + idx + 1);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Filters Overlay */}
      {mobileFiltersVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="bg-white h-full w-4/5 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setMobileFiltersVisible(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Price</h3>
              <div className="px-1">
                <input 
                  type="range" 
                  min="0" 
                  max={maxPrice} 
                  className="w-full accent-red-500"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$0</span>
                  <span className="font-medium text-gray-700">${priceRange}</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    className={`flex items-center w-full p-2 rounded ${
                      selectedRatings.includes(rating) ? 'bg-red-50 text-red-500' : 'text-gray-700'
                    }`}
                    onClick={() => toggleRatingFilter(rating)}
                  >
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm">{rating} & Up</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="w-full py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
              onClick={() => setMobileFiltersVisible(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex text-sm">
            <li className="text-gray-500">
              <Link to="/" className="hover:text-red-500">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">
              <Link to="/shop" className="hover:text-red-500">Shop</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">
              <Link to="/collections" className="hover:text-red-500">Collections</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">
              {categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          </ol>
        </nav>
        
        {/* Category Hero */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl mb-8 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {categoryData?.name || category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-gray-300 max-w-2xl">
            {categoryData?.description || `Browse our collection of high-quality ${category} peripherals.`}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar - Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
              <h2 className="font-bold text-lg mb-4 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h2>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="px-1">
                  <input 
                    type="range" 
                    min="0" 
                    max={maxPrice} 
                    className="w-full accent-red-500"
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>$0</span>
                    <span className="font-medium text-gray-700">${priceRange}</span>
                    <span>${maxPrice}</span>
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      className={`flex items-center w-full p-2 rounded ${
                        selectedRatings.includes(rating) ? 'bg-red-50 text-red-500' : 'text-gray-700'
                      }`}
                      onClick={() => toggleRatingFilter(rating)}
                    >
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm">{rating} & Up</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters */}
              {(selectedRatings.length > 0 || priceRange < maxPrice) && (
                <button 
                  className="text-red-500 text-sm hover:text-red-600 mt-2 w-full text-center"
                  onClick={() => {
                    setSelectedRatings([]);
                    setPriceRange(maxPrice);
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {/* Mobile Filter and Sort Bar */}
            <div className="flex gap-2 mb-4 md:hidden">
              <button 
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm flex-1 text-left"
                onClick={() => setMobileFiltersVisible(true)}
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
              </button>
              
              <div className="relative flex-1">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-white rounded-lg px-4 py-3 shadow-sm appearance-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <ArrowUpDown size={18} className="absolute right-3 top-3.5 pointer-events-none text-gray-500" />
              </div>
            </div>
            
            {/* Sort and View Controls (Desktop) */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">View:</span>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className={`p-2 ${view === 'grid' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                    onClick={() => setView('grid')}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    className={`p-2 ${view === 'list' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                    onClick={() => setView('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
              </p>
            </div>
            
            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : currentProducts.length > 0 ? (
              <div className={view === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-6"
              }>
                {currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      images: product.images,
                      rating: product.rating,
                    }}
                    horizontal={view === 'list'} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Filter size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => {
                    setSelectedRatings([]);
                    setPriceRange(maxPrice);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {!loading && products.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex shadow-sm rounded-lg overflow-hidden">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-4 py-2 border ${
                      currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {getPaginationGroup().map((num) => (
                    <button
                      key={num}
                      onClick={() => goToPage(num)}
                      className={`px-4 py-2 border-t border-b ${
                        currentPage === num
                          ? 'bg-red-500 text-white font-medium border-red-500'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  
                  <button 
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-4 py-2 border ${
                      currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;