// components/home/FeaturedProducts.jsx
import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import ProductCard from '../ui/ProductCard';
// import { products } from '../../api/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts = () => {
  // Hardcoded sample data
  const featuredProducts = [
    {
      id: 1,
      title: "PlayStation 5 DualSense Controller",
      price: 69.99,
      image: "../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png",
      rating: 5,
      oldPrice: 79.99,
    },
    {
      id: 2,
      title: "Razer BlackShark V2 Pro",
      price: 179.99,
      image: "../../media/controller-2.jpg",
      rating: 4,
      oldPrice: 159.99,
    },
    {
      id: 3,
      title: "Logitech G Pro X Superlight",
      price: 149.99,
      image: "../../media/controller-1.jpg",
      rating: 5,
      oldPrice: 109.99,
    },
    {
      id: 4,
      title: "SteelSeries Apex Pro",
      price: 199.99,
      image: "../../media/controller-3.jpg",
      rating: 4,
      oldPrice: 179.99,
    },
    {
      id: 5,
      title: "ASUS ROG Swift PG279QM",
      price: 849.99,
      image: "../../media/controller-1.jpg",
      rating: 5,
      oldPrice: 779.99,
    }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Products" centered />
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow items-center justify-center text-gray-700 hidden md:inline-flex">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow items-center justify-center text-gray-700 hidden md:inline-flex">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;