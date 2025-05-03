import React from "react";
import SecureIcon from "./ui/SecureIcon";
import ShippingIcon from "./ui/ShippingIcon";
import SupportIcon from "./ui/SupportIcon";

export default function Additional_Info() {
  return (
    <div className="bg-white text-gray-900 py-8 relative overflow-hidden">
      {/* Grid background for consistency with hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12">
          {Array(13).fill(0).map((_, i) => (
            <div 
              key={`col-${i}`} 
              className="absolute top-0 bottom-0 w-px bg-blue-500/10" 
              style={{ 
                left: `${(i / 12) * 100}%`,
                opacity: i % 3 === 0 ? 0.15 : 0.08 
              }} 
            />
          ))}
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 opacity-30" 
           style={{ 
             background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
             mixBlendMode: 'screen'
           }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center space-x-4 p-4 border border-blue-700/30 rounded-lg bg-blue-900/20 backdrop-blur-sm w-full md:w-auto">
            <div className="p-3 bg-blue-600/20 rounded-full">
              <SecureIcon className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold tracking-wider">100% SECURE</p>
              <p className="text-blue-300 font-medium text-sm">CHECKOUT</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 border border-blue-700/30 rounded-lg bg-blue-900/20 backdrop-blur-sm w-full md:w-auto">
            <div className="p-3 bg-blue-600/20 rounded-full">
              <ShippingIcon className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold tracking-wider">SHIPPING TO OVER 70</p>
              <p className="text-blue-300 font-medium text-sm">COUNTRIES</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 border border-blue-700/30 rounded-lg bg-blue-900/20 backdrop-blur-sm w-full md:w-auto">
            <div className="p-3 bg-blue-600/20 rounded-full">
              <SupportIcon className="text-blue-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold tracking-wider">OUTSTANDING</p>
              <p className="text-blue-300 font-medium text-sm">SUPPORT</p>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Animated particles for visual consistency */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array(5).fill(0).map((_, i) => (
          <div 
            key={`particle-${i}`} 
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`,
              opacity: Math.random() * 0.4 + 0.1,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      {/* Add keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-5px) translateX(5px);
          }
          50% {
            transform: translateY(3px) translateX(-3px);
          }
          75% {
            transform: translateY(5px) translateX(3px);
          }
        }
      `}</style>
    </div>
  );
}