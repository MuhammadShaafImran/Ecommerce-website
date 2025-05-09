// pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ProductShowcase from '../components/home/ProductShowcase';
import WeeklyDeals from '../components/home/WeeklyDeals';
import Testimonials from '../components/home/Testimonials';
import LatestNews from '../components/home/LatestNews';
import FeatureIcons from '../components/home/FeatureIcons';
import { getCompleteProductById } from '../api/product/read';

const Home = () => {
  // Get featured showcase products
  const [showcaseProducts, setShowcaseProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getCompleteProductById(2);
        setShowcaseProducts(data);
        // console.log('Show case data : ',data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-red-500">{error}</h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <ProductShowcase product={showcaseProducts} imagePosition='right' />
      {/* <WeeklyDeals /> */}
      <ProductShowcase product={showcaseProducts} imagePosition='left' />
      <Testimonials />
      <LatestNews />
      <FeatureIcons />
    </div>
  );
};

export default Home;