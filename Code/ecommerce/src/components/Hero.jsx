// import { useState, useEffect } from 'react';
// import { ChevronRight, Gamepad2, Star } from 'lucide-react';

// export default function Hero() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
//       {/* Grid Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
//           {/* Generate grid lines */}
//           {Array(13).fill(0).map((_, i) => (
//             <div 
//               key={`col-${i}`} 
//               className="absolute top-0 bottom-0 w-px bg-blue-500/10" 
//               style={{ 
//                 left: `${(i / 12) * 100}%`,
//                 opacity: i % 3 === 0 ? 0.15 : 0.08 
//               }} 
//             />
//           ))}
//           {Array(13).fill(0).map((_, i) => (
//             <div 
//               key={`row-${i}`} 
//               className="absolute left-0 right-0 h-px bg-blue-500/10" 
//               style={{ 
//                 top: `${(i / 12) * 100}%`,
//                 opacity: i % 3 === 0 ? 0.15 : 0.08 
//               }} 
//             />
//           ))}
//         </div>

//         {/* Center radial gradient */}
//         <div className="absolute inset-0" 
//              style={{ 
//                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 60%)',
//                mixBlendMode: 'screen'
//              }} />

//         {/* Animated particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {Array(8).fill(0).map((_, i) => (
//             <div 
//               key={`particle-${i}`} 
//               className="absolute rounded-full bg-blue-500/20"
//               style={{
//                 width: `${Math.random() * 6 + 3}px`,
//                 height: `${Math.random() * 6 + 3}px`,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animation: `float ${Math.random() * 10 + 15}s infinite linear`,
//                 opacity: Math.random() * 0.5 + 0.2,
//                 filter: 'blur(1px)'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 max-w-7xl mx-auto">
//         <div className="inline-flex items-center bg-blue-900/30 border border-blue-700/30 rounded-full px-4 py-1.5 mb-6">
//           <Star size={16} className="text-blue-400 mr-2" />
//           <span className="text-blue-200 text-sm font-medium">New releases available now</span>
//         </div>

//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
//           <span className="block text-white">YOUR ULTIMATE</span>
//           <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//             GAMING DESTINATION
//           </span>
//         </h1>

//         <p className="text-gray-300 max-w-2xl mb-10 text-lg">
//           Discover thousands of titles from indie gems to AAA blockbusters. 
//           Join millions of gamers and level up your gaming experience today.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className="group relative bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center justify-center">
//               Shop Now
//               <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//           </button>

//           <button className="border border-blue-500/40 hover:border-blue-500 text-blue-400 hover:text-blue-300 px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center">
//             <Gamepad2 size={18} className="mr-2" />
//             Browse Categories
//           </button>
//         </div>
//       </div>

//       {/* Featured Game Showcase */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl pointer-events-none">
//         <div className="relative w-full pb-32 sm:pb-48 md:pb-56 lg:pb-64">
//           {/* Shadow effect */}
//           <div className="absolute bottom-0 left-0 right-0 h-20">
//             <div className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 opacity-30 blur-2xl rounded-full" />
//           </div>

//           {/* Game Platform */}
//           <div className="absolute bottom-10 w-full flex items-end justify-center">
//             <div className="w-4/5 max-w-3xl h-auto flex justify-center">
//               {/* Game Cover Image Placeholder */}
//               <div 
//                 className="w-full aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700/50 shadow-2xl transform transition-transform duration-500 hover:scale-105"
//                 style={{ transform: `translateY(${scrollY * 0.05}px)` }}
//               >
//                 <div className="w-full h-full relative bg-gradient-to-br from-blue-900/30 to-purple-900/30">
//                   {/* Glowing effects */}
//                   <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 blur-2xl rounded-full" />
//                   <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 blur-2xl rounded-full" />

//                   {/* Game title overlay */}
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 flex items-center justify-between">
//                     <div>
//                       <h3 className="text-white text-xl font-bold">Featured Title</h3>
//                       <p className="text-blue-300 text-sm">Coming Soon</p>
//                     </div>
//                     <div className="bg-blue-600/80 px-3 py-1 rounded text-white text-sm font-medium">
//                       Pre-order
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom fade effect */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { ChevronRight, Gamepad2, Star, ChevronLeft } from 'lucide-react';

// export default function Hero() {
//   const [isHovered, setIsHovered] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Featured games data
//   const featuredGames = [
//     {
//       id: 1,
//       title: "Cosmic Odyssey",
//       status: "Coming Soon",
//       actionText: "Pre-order",
//       bgColor: "from-blue-900/30 to-purple-900/30",
//       glowColor1: "bg-blue-500/10",
//       glowColor2: "bg-purple-500/10"
//     },
//     {
//       id: 2,
//       title: "Shadow Realm",
//       status: "New Release",
//       actionText: "Buy Now",
//       bgColor: "from-red-900/30 to-orange-900/30",
//       glowColor1: "bg-red-500/10",
//       glowColor2: "bg-orange-500/10"
//     },
//     {
//       id: 3,
//       title: "Neo Dynasty",
//       status: "Best Seller",
//       actionText: "Add to Cart",
//       bgColor: "from-green-900/30 to-teal-900/30",
//       glowColor1: "bg-green-500/10",
//       glowColor2: "bg-teal-500/10"
//     },
//     {
//       id: 4,
//       title: "Astral Legends",
//       status: "Special Edition",
//       actionText: "Learn More",
//       bgColor: "from-purple-900/30 to-indigo-900/30",
//       glowColor1: "bg-purple-500/10",
//       glowColor2: "bg-indigo-500/10"
//     }
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-rotate carousel
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [featuredGames.length]);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
//       {/* Grid Background */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
//           {/* Generate grid lines */}
//           {Array(13).fill(0).map((_, i) => (
//             <div
//               key={`col-${i}`}
//               className="absolute top-0 bottom-0 w-px bg-blue-500/10"
//               style={{
//                 left: `${(i / 12) * 100}%`,
//                 opacity: i % 3 === 0 ? 0.15 : 0.08
//               }}
//             />
//           ))}
//           {Array(13).fill(0).map((_, i) => (
//             <div
//               key={`row-${i}`}
//               className="absolute left-0 right-0 h-px bg-blue-500/10"
//               style={{
//                 top: `${(i / 12) * 100}%`,
//                 opacity: i % 3 === 0 ? 0.15 : 0.08
//               }}
//             />
//           ))}
//         </div>

//         {/* Center radial gradient */}
//         <div className="absolute inset-0"
//           style={{
//             background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 60%)',
//             mixBlendMode: 'screen'
//           }} />

//         {/* Animated particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {Array(8).fill(0).map((_, i) => (
//             <div
//               key={`particle-${i}`}
//               className="absolute rounded-full bg-blue-500/20"
//               style={{
//                 width: `${Math.random() * 6 + 3}px`,
//                 height: `${Math.random() * 6 + 3}px`,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animation: `float ${Math.random() * 10 + 15}s infinite linear`,
//                 opacity: Math.random() * 0.5 + 0.2,
//                 filter: 'blur(1px)'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 max-w-7xl mx-auto">
//         <div className="inline-flex items-center bg-blue-900/30 border border-blue-700/30 rounded-full px-4 py-1.5 mb-6">
//           <Star size={16} className="text-blue-400 mr-2" />
//           <span className="text-blue-200 text-sm font-medium">New releases available now</span>
//         </div>

//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
//           <span className="block text-white">YOUR ULTIMATE</span>
//           <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//             GAMING DESTINATION
//           </span>
//         </h1>

//         <p className="text-gray-300 max-w-2xl mb-10 text-lg">
//           Discover thousands of titles from indie gems to AAA blockbusters.
//           Join millions of gamers and level up your gaming experience today.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className="group relative bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center justify-center">
//               Shop Now
//               <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//           </button>

//           <button className="border border-blue-500/40 hover:border-blue-500 text-blue-400 hover:text-blue-300 px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center">
//             <Gamepad2 size={18} className="mr-2" />
//             Browse Categories
//           </button>
//         </div>
//       </div>

//       {/* Featured Game Showcase Carousel */}
//       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl pt-5">
//         <div className="relative w-full pb-32 sm:pb-48 md:pb-56 lg:pb-64">
//           {/* Shadow effect */}
//           <div className="absolute bottom-0 left-0 right-0 h-20">
//             <div className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 opacity-30 blur-2xl rounded-full" />
//           </div>

//           {/* Game Platform with Carousel */}
//           <div className="absolute bottom-2 w-full">
//             {/* Carousel Slides Container */}
//             <div className="w-full overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 {featuredGames.map((game, index) => (
//                   <div
//                     key={`game-${game.id}`}
//                     className="w-full flex-shrink-0 flex justify-center px-4"
//                   >
//                     <div
//                       className="w-full max-w-3xl aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700/50 shadow-2xl transform transition-transform duration-500 hover:scale-105"
//                       style={{ transform: `translateY(${scrollY * 0.05}px)` }}
//                     >
//                       <div className={`w-full h-full relative bg-gradient-to-br ${game.bgColor}`}>
//                         {/* Glowing effects */}
//                         <div className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 ${game.glowColor1} blur-2xl rounded-full`} />
//                         <div className={`absolute bottom-1/4 right-1/4 w-1/3 h-1/3 ${game.glowColor2} blur-2xl rounded-full`} />

//                         {/* Game title overlay */}
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 flex items-center justify-between">
//                           <div>
//                             <h3 className="text-white text-xl font-bold">{game.title}</h3>
//                             <p className="text-blue-300 text-sm">{game.status}</p>
//                           </div>
//                           <div className="bg-blue-600/80 px-3 py-1 rounded text-white text-sm font-medium">
//                             {game.actionText}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Carousel Controls */}
//             <div className="flex justify-between items-center mb-4 px-4">

//               {/* Carousel Indicators */}
//               <div className="flex space-x-2">
//                 {featuredGames.map((_, index) => (
//                   <button
//                     key={`indicator-${index}`}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-500/50 hover:bg-gray-400/50'
//                       }`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom fade effect */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />

//       {/* Add keyframes for floating animation */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) translateX(0);
//           }
//           25% {
//             transform: translateY(-10px) translateX(10px);
//           }
//           50% {
//             transform: translateY(5px) translateX(-5px);
//           }
//           75% {
//             transform: translateY(10px) translateX(5px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { ChevronRight, Gamepad2, Star } from 'lucide-react';
import FeaturedGameCarousel from './FeaturedGameCarousel'; // adjust path as needed

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Featured games data
  const featuredGames = [
    {
      id: 1,
      title: "Cosmic Odyssey",
      status: "Coming Soon",
      actionText: "Pre-order",
      bgColor: "from-blue-900/30 to-purple-900/30",
      glowColor1: "bg-blue-500/10",
      glowColor2: "bg-purple-500/10"
    },
    {
      id: 2,
      title: "Shadow Realm",
      status: "New Release",
      actionText: "Buy Now",
      bgColor: "from-red-900/30 to-orange-900/30",
      glowColor1: "bg-red-500/10",
      glowColor2: "bg-orange-500/10"
    },
    {
      id: 3,
      title: "Neo Dynasty",
      status: "Best Seller",
      actionText: "Add to Cart",
      bgColor: "from-green-900/30 to-teal-900/30",
      glowColor1: "bg-green-500/10",
      glowColor2: "bg-teal-500/10"
    },
    {
      id: 4,
      title: "Astral Legends",
      status: "Special Edition",
      actionText: "Learn More",
      bgColor: "from-purple-900/30 to-indigo-900/30",
      glowColor1: "bg-purple-500/10",
      glowColor2: "bg-indigo-500/10"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
          {/* Generate grid lines */}
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
          {Array(13).fill(0).map((_, i) => (
            <div
              key={`row-${i}`}
              className="absolute left-0 right-0 h-px bg-blue-500/10"
              style={{
                top: `${(i / 12) * 100}%`,
                opacity: i % 3 === 0 ? 0.15 : 0.08
              }}
            />
          ))}
        </div>

        {/* Center radial gradient */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 60%)',
            mixBlendMode: 'screen'
          }} />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array(8).fill(0).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-500/20"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s infinite linear`,
                opacity: Math.random() * 0.5 + 0.2,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 max-w-7xl mx-auto">
        <div className="inline-flex items-center bg-blue-900/30 border border-blue-700/30 rounded-full px-4 py-1.5 mb-6">
          <Star size={16} className="text-blue-400 mr-2" />
          <span className="text-blue-200 text-sm font-medium">New releases available now</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="block text-white">YOUR ULTIMATE</span>
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            GAMING DESTINATION
          </span>
        </h1>

        <p className="text-gray-300 max-w-2xl mb-10 text-lg">
          Discover thousands of titles from indie gems to AAA blockbusters.
          Join millions of gamers and level up your gaming experience today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              Shop Now
              <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="border border-blue-500/40 hover:border-blue-500 text-blue-400 hover:text-blue-300 px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center">
            <Gamepad2 size={18} className="mr-2" />
            Browse Categories
          </button>
        </div>
      </div>
      {/* Featured Game Showcase Carousel */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl pt-5">
        <FeaturedGameCarousel games={featuredGames} scrollY={scrollY} />
      </div>

      {/* Add keyframes for floating animation */}
      <style jsx>{`
         @keyframes float {
           0%, 100% {
             transform: translateY(0) translateX(0);
           }
           25% {
             transform: translateY(-10px) translateX(10px);
           }
           50% {
             transform: translateY(5px) translateX(-5px);
           }
           75% {
             transform: translateY(10px) translateX(5px);
           }
         }
       `}</style>
    </div>
  );
}
