// components/home/FeatureIcons.jsx
import React from 'react';
import { Truck, Clock, CreditCard, Headphones } from 'lucide-react';

const FeatureIcons = () => {
  const features = [
    {
      icon: <Truck size={32} className="text-red-500" />,
      title: "Fast Shipping",
      description: "Free delivery for all orders over $100"
    },
    {
      icon: <CreditCard size={32} className="text-red-500" />,
      title: "Secure Payment",
      description: "Multiple payment methods accepted"
    },
    {
      icon: <Clock size={32} className="text-red-500" />,
      title: "30-Day Returns",
      description: "Hassle-free returns & exchanges"
    },
    {
      icon: <Headphones size={32} className="text-red-500" />,
      title: "Support 24/7",
      description: "Dedicated support specialists"
    }
  ];

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-4">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureIcons;