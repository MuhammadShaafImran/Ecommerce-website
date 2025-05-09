// components/home/CategorySection.jsx
import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import { Keyboard, Mouse, Headphones, Gamepad, Check } from 'lucide-react';
import { getAllCategories } from '../../api/category/categories';

const CategorySection = () => {
  const [categories, setCategories] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await getAllCategories();
      if (error) {
        console.error("Error fetching categories:", error);
        setError(error);
      } else {
        // console.log("Fetched categories:", data);
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">SHOP BY CATEGORIES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;