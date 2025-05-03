import React from 'react';
import { Truck, RefreshCw, Headphones, ShieldCheck } from 'lucide-react';

const ServiceSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Express Delivery",
      description: "Free shipping on all orders over $50",
      gradient: "from-blue-600 to-blue-400"
    },
    {
      icon: RefreshCw,
      title: "30-Day Returns",
      description: "Easy returns with no questions asked",
      gradient: "from-purple-600 to-purple-400"
    },
    {
      icon: Headphones,
      title: "24/7 Gaming Support",
      description: "Expert assistance whenever you need",
      gradient: "from-pink-600 to-pink-400"
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Multiple secure payment options",
      gradient: "from-indigo-600 to-indigo-400"
    }
  ];

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array(9).fill(0).map((_, i) => (
            <div 
              key={`col-${i}`} 
              className="absolute top-0 bottom-0 w-px bg-blue-500/10" 
              style={{ 
                left: `${(i / 8) * 100}%`,
                opacity: i % 2 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
          {Array(9).fill(0).map((_, i) => (
            <div 
              key={`row-${i}`} 
              className="absolute left-0 right-0 h-px bg-blue-500/10" 
              style={{ 
                top: `${(i / 8) * 100}%`,
                opacity: i % 2 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} p-3 mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
    </div>
  );
};

export default ServiceSection;