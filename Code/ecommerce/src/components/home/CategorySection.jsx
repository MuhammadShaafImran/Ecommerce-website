// components/home/CategorySection.jsx
import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import { Keyboard, Mouse, Headphones, Gamepad, Check } from 'lucide-react';
import { getAllCategories } from '../../api/categories';

// const categories = [
//   {
//     id: 1,
//     title: "Gaming Keyboard",
//     icon: Keyboard,
//     bgColor: "from-blue-600/20 to-purple-600/20",
//     image: "/media/controller-category.jpg"
//   },
//   {
//     id: 2,
//     title: "Gaming Mouse",
//     icon: Mouse,
//     bgColor: "from-red-600/20 to-orange-600/20",
//     image: "/media/keyboard.jpg"
//   },
//   {
//     id: 3,
//     title: "Gaming Audio",
//     icon: Headphones,
//     bgColor: "from-green-600/20 to-teal-600/20",
//     image: "/media/mouse.jpg"
//   },
//   {
//     id: 4,
//     title: "Controllers",
//     icon: Gamepad,
//     bgColor: "from-purple-600/20 to-pink-600/20",
//     image: "/media/monitor.jpg"
//   }
// ];

const CategorySection = () => {
  const [categories, setCategories] = React.useState([]);
  const [error, setError] = React.useState(null);

  const CheckAPI = async () => {
    const { data, error } = await getAllCategories();
    if (error) {
      console.error("Error fetching categories:", error);
      setError(error);
    } else {
      console.log("Fetched categories:", data);
      setCategories(data);
    }
  };
  return (
    <section className="py-12" onClick={CheckAPI}>
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