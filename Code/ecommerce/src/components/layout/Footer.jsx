// components/layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ChevronRight, Mail } from 'lucide-react';
import Button from '../ui/Button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 pt-16 pb-8 text-gray-300">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              <span className="text-red-500">Gear</span>Up
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              Your ultimate destination for premium gaming peripherals. 
              Level up your gaming experience with top-tier gear.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-white mb-6 flex items-center">
              <ChevronRight size={20} className="text-red-500 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/category" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg text-white mb-6 flex items-center">
              <ChevronRight size={20} className="text-red-500 mr-2" />
              Customer Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/profile" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500 transition-colors flex items-center">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 mr-1" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg text-white mb-6 flex items-center">
              <ChevronRight size={20} className="text-red-500 mr-2" />
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to get special offers, free giveaways, and amazing deals.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-gray-300 placeholder-gray-500"
                  required
                />
              </div>
              <Button type="submit" className="w-full px-8 py-3 bg-red-500 hover:bg-red-600">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} GearUp Gaming. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-red-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-red-500 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;