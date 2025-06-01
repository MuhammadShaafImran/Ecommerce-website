// components/home/CategorySection.jsx
import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import { getAllCategories } from '../../api/category/categories';

const CategorySection = () => {
  const [categories, setCategories] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await getAllCategories();
        if (error) {
          console.error("Error fetching categories:", error);
          setError("Unable to load categories. Please try again later.");
        } else {
          setCategories(data);
          setError(null);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again later.");
      }
    };
    fetchCategories();
  }, []);

  if (error) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-medium text-red-800">Error Loading Categories</h2>
            </div>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">SHOP BY CATEGORIES</h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </div>
    </section>
  );
};

export default CategorySection;