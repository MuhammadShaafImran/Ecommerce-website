import React from "react";
import InstagramIcon from "./ui/InstagramIcon";
import FacebookIcon from "./ui/FacebookIcon";
import TwitterIcon from "./ui/TwitterIcon";
import LinkedInIcon from "./ui/LinkedInIcon";
import ShopMetricLogo from "./ui/ShopMetricLogo";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main links section */}
        <div className="flex flex-wrap md:flex-row mb-12 gap-4">

          {/* Logo and subscription */}
          <div className="basis-1/3">
            {/* Logo */}
            <div className="mb-6 w-16">
              {/* <ShopMetricLogo /> */}
              <img src="../../media/Sadapay.png" alt="Logo" srcset="" />
            </div>

            {/* Email subscription */}
            <div>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Get latest offers to your inbox"
                  className="bg-transparent border-b border-gray-500 focus:border-white outline-none text-white px-2 py-2 flex-grow"
                />
                <button className="bg-black border border-white text-white px-4 py-2 ml-2 hover:bg-gray-800 transition duration-300">
                  →
                </button>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-6 mt-8">
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="#"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="basis-2/3 grid grid-cols-3 md:grid-col-1 gap-3">

          
          {/* Shop */}
          <div>
            <h3 className="text-lg font-medium mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  My account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>
          {/* Information */}
          <div>
            <h3 className="text-lg font-medium mb-6">Information</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Cookies Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Frequently asked
                </a>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          </div>

        </div>

        {/* Border line */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom copyright and payment methods */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 ShopMetric. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex space-x-4">
            <img
              src="/api/placeholder/40/24"
              alt="Visa"
              className="h-6 w-auto"
            />
            <img
              src="/api/placeholder/40/24"
              alt="Mastercard"
              className="h-6 w-auto"
            />
            <img
              src="/api/placeholder/40/24"
              alt="American Express"
              className="h-6 w-auto"
            />
            <img
              src="/api/placeholder/40/24"
              alt="PayPal"
              className="h-6 w-auto"
            />
            <img
              src="/api/placeholder/40/24"
              alt="Apple Pay"
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

{/* Newsletter Popup */ }
{/*<div className="fixed bottom-4 right-4 z-30 bg-white text-black p-4 rounded-lg shadow-lg max-w-sm hidden md:block">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-bold">Subscribe to our newsletter</h4>
          <button className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <p className="text-sm mb-3">Get 10% off your first order and stay updated with new products and exclusive offers!</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </div>
      </div> */}