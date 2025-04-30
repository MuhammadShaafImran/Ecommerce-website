import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail from "./pages/ProductDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductReviews from './compnents/productReview';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/productDetails" element={<ProductDetail />} />
      <Route path="/productReviews" element = {<ProductReviews />} />
    </Routes>
  );
}

export default MainRoutes;
