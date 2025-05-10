import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/client/Home';
import ProductDetails from './pages/client/ProductDetails';
import CategoryPage from './pages/client/CategoryPage';
import CategoryDetail from './pages/client/CategoryDetail';
import Cart from './pages/client/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Products from './pages/client/Products';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminGuard from './components/guards/AdminGuard';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/category/:category" element={<CategoryDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/collections" element={<CategoryPage />} />
      <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
    </Routes>
  );
}

export default MainRoutes;
