// components/layout/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../shared/Navigation';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-bold text-xl text-black">GAMING</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* Header Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-1">
            <Search size={20} />
          </button>
          <Link to="/account" className="p-1">
            <User size={20} />
          </Link>
          <Link to="/cart" className="p-1 relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              0
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="p-1 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <Navigation mobile={true} />
        </div>
      )}
    </header>
  );
};

export default Header;