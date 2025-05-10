import React, { useState, useEffect } from 'react';
import { Plus, Search, Package, Users, ShoppingCart, Settings } from 'lucide-react';
import ProductManager from '../../components/admin/ProductManager';
import CategoryManager from '../../components/admin/CategoryManager';
import OrderManager from '../../components/admin/OrderManager';
import CustomerManager from '../../components/admin/CustomerManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2">
                <Plus size={20} />
                Add New
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-6 mt-6">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 \${
                activeTab === 'products'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Package size={20} />
              Products
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-4 py-2 \${
                activeTab === 'categories'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Settings size={20} />
              Categories
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 \${
                activeTab === 'orders'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <ShoppingCart size={20} />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-4 py-2 \${
                activeTab === 'customers'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Users size={20} />
              Customers
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'products' && <ProductManager searchQuery={searchQuery} />}
        {activeTab === 'categories' && <CategoryManager searchQuery={searchQuery} />}
        {activeTab === 'orders' && <OrderManager searchQuery={searchQuery} />}
        {activeTab === 'customers' && <CustomerManager searchQuery={searchQuery} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
