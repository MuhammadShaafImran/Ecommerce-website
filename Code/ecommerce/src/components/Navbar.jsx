// import React, { useState } from 'react';
// import { Home, ShoppingBag, Flame, Sparkles, Tag, Gamepad2, Menu, X, ShoppingCart, ChevronDown, User } from 'lucide-react';

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
  
//   const navItems = [
//     { name: 'POPULAR', icon: Flame, href: '#' },
//     { name: 'NEW', icon: Sparkles, href: '#' },
//     { 
//       name: 'GENRES', 
//       icon: Gamepad2, 
//       href: '#',
//       hasDropdown: true,
//       dropdownItems: [
//         { name: 'Action', href: '#' },
//         { name: 'Adventure', href: '#' },
//         { name: 'RPG', href: '#' },
//         { name: 'Strategy', href: '#' },
//         { name: 'Sports', href: '#' },
//       ]
//     },
//     { name: 'ON SALE', icon: Tag, href: '#' },
//   ];

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//     if (dropdownOpen) setDropdownOpen(false);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <header className="relative bg-gray-900 border-b border-gray-800">
//       {/* Desktop Navigation */}
//       <div className="max-w-7xl mx-auto px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <a href="#" className="font-bold text-2xl text-white flex items-center">
//               <Gamepad2 size={28} className="mr-2 text-blue-400" />
//               <span>Game Empire</span> 
//             </a>
//           </div>
          
//           {/* Desktop Menu Items */}
//           <nav className="hidden md:flex space-x-8">
//             {navItems.map((item) => (
//               <div key={item.name} className="relative">
//                 {item.hasDropdown ? (
//                   <button 
//                     className="flex items-center text-gray-300 hover:text-white focus:outline-none transition-colors"
//                     onClick={toggleDropdown}
//                   >
//                     <item.icon size={18} className="mr-2" />
//                     {item.name} 
//                     <ChevronDown size={16} className="ml-1" />
//                   </button>
//                 ) : (
//                   <a 
//                     href={item.href}
//                     className="flex items-center text-gray-300 hover:text-white transition-colors"
//                   >
//                     <item.icon size={18} className="mr-2" />
//                     {item.name}
//                   </a>
//                 )}
                
//                 {/* Dropdown Menu */}
//                 {item.hasDropdown && dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
//                     {item.dropdownItems.map((dropdownItem) => (
//                       <a
//                         key={dropdownItem.name}
//                         href={dropdownItem.href}
//                         className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
//                       >
//                         {dropdownItem.name}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>
          
//           {/* User/Cart Actions */}
//           <div className="flex items-center space-x-4">
//             <a href="#" className="flex items-center px-3 py-2 text-white hover:text-blue-400 transition-colors">
//               <ShoppingCart size={20} />
//               <span className="ml-2 hidden md:inline text-gray-300">[0]</span>
//             </a>
            
//             <button className="border border-blue-400 text-white px-4 py-2 rounded hover:bg-blue-900/30 transition-colors flex items-center">
//               <User size={18} className="mr-2" />
//               <span className="hidden md:inline">Log in</span>
//             </button>
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
//               onClick={toggleMobileMenu}
//             >
//               {mobileMenuOpen ? (
//                 <X size={24} />
//               ) : (
//                 <Menu size={24} />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile Navigation */}
//       {mobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-40 bg-gray-900">
//           <div className="pt-16 pb-6 px-4 space-y-4">
//             {navItems.map((item) => (
//               <div key={item.name} className="py-2">
//                 {item.hasDropdown ? (
//                   <button 
//                     className="flex items-center justify-center w-full py-2"
//                     onClick={toggleDropdown}
//                   >
//                     <item.icon size={24} className="text-gray-300 hover:text-white transition-colors" />
//                   </button>
//                 ) : (
//                   <a 
//                     href={item.href}
//                     className="flex items-center justify-center w-full py-2"
//                   >
//                     <item.icon size={24} className="text-gray-300 hover:text-white transition-colors" />
//                   </a>
//                 )}
                
//                 {/* Dropdown Items in Mobile */}
//                 {item.hasDropdown && dropdownOpen && (
//                   <div className="mt-2 space-y-2 pl-4">
//                     {item.dropdownItems.map((dropdownItem) => (
//                       <a
//                         key={dropdownItem.name}
//                         href={dropdownItem.href}
//                         className="block py-2 text-blue-400 hover:text-white"
//                       >
//                         {dropdownItem.name}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
            
//             {/* Mobile Cart/Login */}
//             <div className="flex justify-center space-x-8 pt-4">
//               <a href="#" className="flex items-center justify-center py-2">
//                 <ShoppingCart size={24} className="text-gray-300 hover:text-white transition-colors" />
//               </a>
              
//               <a href="#" className="flex items-center justify-center py-2">
//                 <User size={24} className="text-gray-300 hover:text-white transition-colors" />
//               </a>
//             </div>
            
//             {/* Close button */}
//             <div className="absolute top-0 right-0 p-4">
//               <button
//                 type="button"
//                 className="text-gray-400 hover:text-white focus:outline-none"
//                 onClick={toggleMobileMenu}
//               >
//                 <X size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { 
  Gamepad2, 
  Flame, 
  Sparkles, 
  Tag, 
  Menu, 
  X, 
  ShoppingCart, 
  ChevronDown, 
  User,
  Download
} from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const navItems = [
    { id: 'popular', name: 'POPULAR', icon: Flame, href: '#' },
    { id: 'new', name: 'NEW', icon: Sparkles, href: '#' },
    { 
      id: 'genres',
      name: 'GENRES', 
      icon: Gamepad2, 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Action', href: '#action' },
        { name: 'Adventure', href: '#adventure' },
        { name: 'RPG', href: '#rpg' },
        { name: 'Strategy', href: '#strategy' },
        { name: 'Sports', href: '#sports' },
      ]
    },
    { id: 'sale', name: 'ON SALE', icon: Tag, href: '#sale' },
    { id: 'download', name: 'DOWNLOADS', icon: Download, href: '#downloads' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="font-bold text-xl text-white flex items-center group">
              <Gamepad2 size={24} className="mr-2 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Game Empire</span> 
            </a>
          </div>
          
          {/* Desktop Menu Items */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <button 
                    className="flex items-center text-gray-300 hover:text-white focus:outline-none transition-colors font-medium"
                    onClick={() => toggleDropdown(item.id)}
                    aria-expanded={activeDropdown === item.id}
                    aria-haspopup="true"
                  >
                    <item.icon size={16} className="mr-1.5" />
                    {item.name} 
                    <ChevronDown size={14} className={`ml-1 transition-transform duration-200 ${activeDropdown === item.id ? 'transform rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a 
                    href={item.href}
                    className="flex items-center text-gray-300 hover:text-white transition-colors font-medium group"
                  >
                    <item.icon size={16} className="mr-1.5 group-hover:text-blue-400" />
                    {item.name}
                  </a>
                )}
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700 animate-fadeIn">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* User/Cart Actions */}
          <div className="flex items-center space-x-4">
            <a href="#cart" className="relative flex items-center p-2 text-gray-300 hover:text-blue-400 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </a>
            
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md transition-colors flex items-center font-medium text-sm">
              <User size={16} className="mr-2" />
              <span className="hidden md:inline">Login</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-sm">
          <div className="pt-20 pb-6 px-6 space-y-6 flex flex-col h-full">
            <div className="space-y-6 flex-1">
              {navItems.map((item) => (
                <div key={item.id} className="py-1">
                  {item.hasDropdown ? (
                    <div>
                      <button 
                        className="flex items-center w-full py-2 text-lg text-gray-300 hover:text-white"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <item.icon size={20} className="mr-3 text-blue-500" />
                        {item.name}
                        <ChevronDown size={18} className={`ml-2 transition-transform duration-200 ${activeDropdown === item.id ? 'transform rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Items in Mobile */}
                      {activeDropdown === item.id && (
                        <div className="mt-2 space-y-1 pl-9 border-l border-gray-700">
                          {item.dropdownItems.map((dropdownItem) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block py-2 text-gray-400 hover:text-blue-400"
                            >
                              {dropdownItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a 
                      href={item.href}
                      className="flex items-center w-full py-2 text-lg text-gray-300 hover:text-white"
                    >
                      <item.icon size={20} className="mr-3 text-blue-500" />
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile Cart/Login */}
            <div className="border-t border-gray-800 pt-6 pb-4">
              <div className="flex justify-between">
                <a href="#cart" className="flex items-center p-2 text-gray-300 hover:text-blue-400">
                  <ShoppingCart size={22} className="mr-2" />
                  <span>Cart (0)</span>
                </a>
                
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition-colors flex items-center">
                  <User size={18} className="mr-2" />
                  <span>Login</span>
                </button>
              </div>
            </div>
            
            {/* Close button */}
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;