import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import CategoryDetail from './pages/CategoryDetail';
import Cart from './pages/Cart';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Products from './pages/Products';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/category/:category" element={<CategoryDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products/>}/>
      <Route path="/collections" element={<CategoryPage />} />
    </Routes>
  );
}

export default MainRoutes;
