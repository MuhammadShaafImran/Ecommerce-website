// import Navbar from '../components/Navbar';
// import Hero from '../components/Hero';
// import CategoryGrid from '../components/home/CategoryGrid';
// import FeaturedProducts from '../components/home/FeaturedProducts';
// import NewArrivals from '../components/NewProducts';
// import WeeklyDeals from '../components/home/WeeklyDeals';
// import Testimonials from '../components/home/Testimonials';
// import LatestNews from '../components/home/LatestNews';
// import ServiceSection from '../components/ServicesSection';
// import Footer from '../components/Footer';

// export default function Home() {
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <CategoryGrid />
//       <FeaturedProducts />
//       <NewArrivals />
//       <WeeklyDeals />
//       <Testimonials />
//       <LatestNews />
//       <ServiceSection />
//       <Footer />
//     </div>
//   );
// }


// pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
// import ProductShowcase from '../components/home/ProductShowcase';
import WeeklyDeals from '../components/home/WeeklyDeals';
import Testimonials from '../components/home/Testimonials';
import LatestNews from '../components/home/LatestNews';
import FeatureIcons from '../components/home/FeatureIcons';
// import { products } from '../api/products';

const Home = () => {
  // Get featured showcase products
  // const showcaseProducts = [
  //   products.find(p => p.id === 'headphones1'),
  //   products.find(p => p.id === 'keyboard1')
  // ];

  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      {/* <ProductShowcase product={{...showcaseProducts[0], imagePosition: 'right'}} /> */}
      <WeeklyDeals />
      {/* <ProductShowcase product={{...showcaseProducts[1], imagePosition: 'left'}} /> */}
      <Testimonials />
      <LatestNews />
      <FeatureIcons />
    </div>
  );
};

export default Home;