import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import AuthGuard from './components/guards/AuthGuard';
import { useAuth } from './contexts/AuthContext';
import Profile from './pages/client/Profile';
import About from './pages/client/About';
import Checkout from './pages/client/Checkout';

function MainRoutes() {
  const { user } = useAuth();

  const isAdmin = (route) => {
    if (user) {
      if (user.role === 'admin') {
        return <Navigate to = 'admin'/>;
      }
      return route;
    }
    return <Login />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={isAdmin(<Login/>)} />
      <Route path="/register" element={isAdmin(<Register />)} />
      <Route path="/" element={isAdmin(<Home />)} />
      <Route path="/home" element={isAdmin(<Home />)} />
      <Route path="/product/:id" element={isAdmin(<ProductDetails />)} />
      <Route path="/category/:category" element={isAdmin(<CategoryDetail />)} />
      <Route path="/products" element={isAdmin(<Products />)} />
      <Route path="/category" element={isAdmin(<CategoryPage />)} />
      <Route path="/about" element={<About/>}/>


      {/* Protected user routes */}
      <Route path="/cart" element={
        <AuthGuard>
          <Cart />
        </AuthGuard>
      } />      <Route path="/profile" element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />
      <Route path="/checkout" element={
        <AuthGuard>
          <Checkout />
        </AuthGuard>
      } />

      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminGuard>
          <AdminDashboard />
        </AdminGuard>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default MainRoutes;
