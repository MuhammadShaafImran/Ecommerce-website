
// components/shared/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ mobile = false }) => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collections' },

  ];

  return (
    <nav className={mobile ? 'flex flex-col space-y-4' : 'flex space-x-6'}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="text-gray-700 hover:text-red-500 font-medium transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;