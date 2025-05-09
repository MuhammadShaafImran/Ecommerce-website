// components/home/Testimonials.jsx
import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';
import { getUsersReviews } from '../../api/product/read'; 

const Testimonials = () => {
  // Hardcoded sample testimonials data
  const [reviews, setReviews] = React.useState([]);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {

    const fetchTestimonials = async () => {
      try {
        const reviews = await getUsersReviews();
        // console.log(reviews);
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();

  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="What Customers Say About Our Products" 
          centered 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <TestimonialCard key={review.id} testimonial={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;