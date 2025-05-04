// components/home/Testimonials.jsx
import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials = () => {
  // Hardcoded sample testimonials data
  const testimonials = [
    {
      name: "John Smith",
      role: "Pro Gamer",
      image: "../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png",
      quote: "The quality of gaming peripherals here is exceptional. My new mechanical keyboard has significantly improved my gaming performance.",
      location: "Califonia, USA",
      rating: 4
    },
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "../../media/controller-3.jpg",
      quote: "Found the perfect streaming setup thanks to the expert recommendations. The customer service is outstanding!",
      rating: 5,
      location: "Toronto, Canada"
    },
    {
      name: "Michael Chen",
      role: "Esports Enthusiast",
      image: "../../media/Sony-PlayStation-PS5-DualSense-Wireless-Controller.png",
      quote: "Great selection of premium gaming gear. The prices are competitive and the shipping was really fast.",
      rating: 4,
      location: "Toronto, Canada"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="What Customers Say About Our Products" 
          centered 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;