import { Keyboard, Mouse, Headphones, Gamepad } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Gaming Keyboard",
    icon: Keyboard,
    bgColor: "from-blue-600/20 to-purple-600/20",
    image: "/media/test-game.jpg"
  },
  {
    id: 2,
    title: "Gaming Mouse",
    icon: Mouse,
    bgColor: "from-red-600/20 to-orange-600/20",
    image: "/media/test-game.jpg"
  },
  {
    id: 3,
    title: "Gaming Audio",
    icon: Headphones,
    bgColor: "from-green-600/20 to-teal-600/20",
    image: "/media/test-game.jpg"
  },
  {
    id: 4,
    title: "Controllers",
    icon: Gamepad,
    bgColor: "from-purple-600/20 to-pink-600/20",
    image: "/media/test-game.jpg"
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Shop By Categories
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/\${category.title.toLowerCase().replace(" ", "-")}`}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br \${category.bgColor} opacity-20`} />
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <category.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>
                
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}2