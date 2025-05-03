import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductDetail from "./pages/ProductDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductReviews from './components/productReview';
import GamingProductSections from "./components/TopProducts";
// import Test from './pages/test';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/home"element={<Home/>}/>
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/productDetails" element={<ProductDetail />} />
      <Route path="/productReviews" element = {<ProductReviews />} />
      <Route path="/products" element = {< GamingProductSections/>}/>
      {/* <Route path="/test" element = {<Test/>}/> */}
    </Routes>

  );
}

export default MainRoutes;
