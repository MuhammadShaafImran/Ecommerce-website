import React from 'react';

// Utility function to generate a random dark color
const getRandomDarkColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 30%, 25%)`; // dark color with low lightness
};

const TestimonialCard = ({ testimonial }) => {
  const address = testimonial.users.addresses.length > 0 ? testimonial.users.addresses[0] : null;
  const username = testimonial.users.username;
  const initial = username ? username.charAt(0).toUpperCase() : '?';
  const bgColor = getRandomDarkColor();

  const rating = testimonial.rating || 0; // Default to 0 
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);

  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
          style={{ backgroundColor: bgColor }}
        >
          <span className="text-white font-bold text-lg">{initial}</span>
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{username}</h4>
          {address && (
            <div className="text-sm text-gray-500">
              {`${address.city}-${address.state}, ${address.country}`}
            </div>
          )}
        </div>
      </div>
      <div className="text-yellow-500 text-lg mb-2">
        {filledStars}{emptyStars}
      </div>
      <p className="text-gray-600 italic">"{testimonial.comment}"</p>
    </div>
  );
};

export default TestimonialCard;
