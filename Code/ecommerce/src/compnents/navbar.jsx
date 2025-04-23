import { useState } from 'react';
import HomeIcon from './ui/HomeIcon'
import DashboardIcon from './ui/DashboardIcon';
import SegmentsIcon from './ui/SegmentsIcon';
import AccountIcon from './ui/AccountIcon';
import SettingsIcon from './ui/SettingsIcon';
import MenuIcon from './ui/MenuIcon';
// Custom SVG icons


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Segments'); // Default active item

  const navItems = [
    { name: 'Home', icon: HomeIcon },
    { name: 'Dashboards', icon: DashboardIcon },
    { name: 'Segments', icon: SegmentsIcon },
    { name: 'Account', icon: AccountIcon },
    { name: 'Settings', icon: SettingsIcon },
  ];

  const dropdownOptions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (name) => activeItem === name;

  return (
    <div className="relative">
      {/* Top Navbar - Desktop */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <a 
                    key={item.name}
                    href="#"
                    className={`flex items-center px-3 py-2 text-lg font-medium ${
                      isActive(item.name) 
                        ? 'text-blue-600' 
                        : 'text-gray-700 hover:text-blue-500'
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <item.icon color={isActive(item.name) ? "#4F46E5" : "#374151"} />
                    <span className="ml-2">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          type="button"
          className="bg-white p-2 rounded-full"
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Side Navigation - Mobile */}
      <div className={`fixed inset-y-0 left-0 transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:hidden bg-white w-64 z-10 transition duration-300 ease-in-out`}>
        <div className="h-full flex flex-col">
          <div className="p-6">
            {/* Mobile Navigation */}
            <div className="space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`flex items-center p-3 text-lg font-medium ${
                    isActive(item.name)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                  onClick={() => {
                    setActiveItem(item.name);
                    setMobileMenuOpen(false);
                  }}
                >
                  <item.icon color={isActive(item.name) ? "#4F46E5" : "#374151"} />
                  <span className="ml-3">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Navigation - Desktop */}
      <div className={`fixed inset-0 ${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-600 bg-opacity-75 z-0`} onClick={toggleMobileMenu}></div>

      {/* Flyout Menu for each navigation item */}
      <div className={`absolute top-16 left-1/3 transform -translate-x-1/2 z-20 ${
        activeItem === 'Segments' && dropdownOpen ? 'block' : 'hidden'
      }`}>
        <div className="bg-white shadow-lg rounded-md w-64">
          <div className="p-4">
            {/* Navigation Sub-items */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex items-center px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded-md"
                onClick={() => {
                  setActiveItem(item.name);
                  setDropdownOpen(false);
                }}
              >
                <item.icon color="#374151" />
                <span className="ml-3">{item.name}</span>
                <span className="ml-auto">{item.name !== 'Home' && '>'}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="absolute top-16 right-4 z-20">
        <div className={`bg-white shadow-lg rounded-md w-64 ${dropdownOpen ? 'block' : 'hidden'}`}>
          <div className="py-1">
            {dropdownOptions.map((option) => (
              <a
                key={option}
                href="#"
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setDropdownOpen(false)}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}