// components/shared/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-gray-600 hover:text-red-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="text-gray-600 hover:text-red-500">
            Products
          </Link>
        </li>
        <li>
          <Link to="/collections" className="text-gray-600 hover:text-red-500">
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;