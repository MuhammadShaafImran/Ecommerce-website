// components/layout/Header.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../shared/Navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { CartContext } from '../../contexts/CartContext';
import AccountIcon from '../ui/AccountIcon';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);   
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-200 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl">
            <span className="text-red-500">Gear</span>Up
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-600 hover:text-red-500 relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <AccountIcon />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 ml-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4">
            <Navigation />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;