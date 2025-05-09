// components/home/FeaturedProducts.jsx
import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import ProductCard from '../ui/ProductCard';
import { getProductsSortedByRating } from '../../api/product/read';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts = () => {

  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {

    const fetchProducts = async () => {
      try {
        const sortedProducts = await getProductsSortedByRating();
        // console.log('Featured Products:',sortedProducts);
        setFeaturedProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(null);
      }
    }
    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // adjust scroll amount as needed
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Products" centered />
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden space-x-4 scrollbar-hide"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default FeaturedProducts;