// components/home/WeeklyDeals.jsx
import React, { useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import DealsDaySelector from '../ui/DealsDaySelector';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';

const WeeklyDeals = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  // Hardcoded sample data for deals
  const dealProducts = [
    // Monday
    [
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
    ],
    // Tuesday
    [
      {
        id: 102,
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
        id: 5,
        title: "ASUS ROG Swift PG279QM",
        price: 849.99,
        image: "../../media/controller-1.jpg",
        rating: 5,
        oldPrice: 779.99,
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
      }
    ]
  ];
  
  // Get deals for selected day
  const getDailyDeals = () => {
    return dealProducts[selectedDay] || dealProducts[0];
  };
  
  const deals = getDailyDeals();
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <SectionTitle title="Weekly Deals" centered />
        <DealsDaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline">View All Deals</Button>
        </div>
      </div>
    </section>
  );
};

export default WeeklyDeals;