import React from "react";
import InstagramIcon from "./ui/InstagramIcon";
import FacebookIcon from "./ui/FacebookIcon";
import TwitterIcon from "./ui/TwitterIcon";
import LinkedInIcon from "./ui/LinkedInIcon";
import ShopMetricLogo from "./ui/ShopMetricLogo";
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-gray-300 py-16 relative overflow-hidden">
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShopMetricLogo className="h-8 w-8 text-blue-500" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Game Empire
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for premium gaming gear. We're committed to providing the best gaming experience with top-notch products and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Shop', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 transform -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-gray-400">123 Gaming Street, Digital City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <span className="text-gray-400">support@gameempire.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="bg-gray-800/50 p-2 rounded-lg hover:bg-blue-600/20 transition-colors duration-200 group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Game Empire. All rights reserved.
          </p>
        </div>
      </div>

      {/* Top fade effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-900 to-transparent" />
    </footer>
  );
}