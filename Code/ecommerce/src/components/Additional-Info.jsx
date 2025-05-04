import React from "react";
import SecureIcon from "./ui/SecureIcon";
import ShippingIcon from "./ui/ShippingIcon";
import SupportIcon from "./ui/SupportIcon";

export default function Additional_Info() {
  return (
    <section className="py-12 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      {/* Background Elements */}
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
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
            mixBlendMode: 'screen'
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                <SecureIcon className="text-blue-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold tracking-wider">100% SECURE</p>
                <p className="text-gray-400 text-sm mt-1">Protected checkout process</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                <ShippingIcon className="text-purple-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold tracking-wider">GLOBAL SHIPPING</p>
                <p className="text-gray-400 text-sm mt-1">Delivering to 70+ countries</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-600/20 rounded-lg group-hover:bg-pink-600/30 transition-colors">
                <SupportIcon className="text-pink-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold tracking-wider">24/7 SUPPORT</p>
                <p className="text-gray-400 text-sm mt-1">Expert assistance anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated particles */}
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
      
      {/* Animation keyframes */}
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

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  );
}