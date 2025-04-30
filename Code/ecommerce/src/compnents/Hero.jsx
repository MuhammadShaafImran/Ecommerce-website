import { useState } from 'react';

export default function GameEmpireHero() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
          {/* Generate grid lines */}
          {Array(13).fill(0).map((_, i) => (
            <div key={`col-${i}`} className="absolute top-0 bottom-0 w-px bg-blue-500/20" style={{ left: `${(i / 12) * 100}%` }} />
          ))}
          {Array(13).fill(0).map((_, i) => (
            <div key={`row-${i}`} className="absolute left-0 right-0 h-px bg-blue-500/20" style={{ top: `${(i / 12) * 100}%` }} />
          ))}
        </div>
        
        {/* Center radial gradient */}
        <div className="absolute inset-0" 
             style={{ 
               background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.2) 0%, rgba(15, 23, 42, 0) 60%)',
               mixBlendMode: 'screen'
             }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="text-white font-bold text-lg">Game Empire</div>
        
        <div className="hidden md:flex space-x-8 text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Popular</a>
          <a href="#" className="hover:text-white transition-colors">New</a>
          <a href="#" className="hover:text-white transition-colors">Genres</a>
          <a href="#" className="hover:text-white transition-colors">On sale</a>
        </div>
        
        <button className="border border-blue-400 text-white px-4 py-2 rounded hover:bg-blue-900/30 transition-colors">
          Log in
        </button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pb-32">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          YOUR ULTIMATE<br />DESTINATION FOR GAMES
        </h1>
        
        <p className="text-gray-300 max-w-lg mb-10">
          Whether you're a casual gamer or a hardcore enthusiast, we have something for everyone.
        </p>
        
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded transition-colors"
        >
          Shop Now
        </button>
      </div>

      {/* Image Placeholder with Shadow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
        <div className="relative w-full pb-64">
          {/* Shadow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-24">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 opacity-30 blur-xl rounded-full" />
          </div>
          
          {/* Image placeholder */}
          <div className="absolute bottom-0 w-full h-full flex items-end justify-center">
            {/* This is where you would place your actual image */}
            <div className="w-4/5 h-4/5 rounded-t-2xl relative">
              {/* Shadow for the image */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-black/30 blur-md rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}