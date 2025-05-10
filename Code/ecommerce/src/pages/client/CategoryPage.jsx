// pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CategorySection from '../../components/home/CategorySection';

const CategoryPage = () => {
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <CategorySection />
    </div>
  );
};

export default CategoryPage;