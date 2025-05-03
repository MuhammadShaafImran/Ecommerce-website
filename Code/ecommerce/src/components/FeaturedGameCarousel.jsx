import { useState, useEffect } from 'react';
import './styles/FeaturedGameCarousel.css';

export default function FeaturedGameCarousel({ games, scrollY }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % games.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [games.length]);

    return (
        <div className="w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {games.map((game) => (
                    <div
                        key={`game-${game.id}`}
                        className="w-full flex-shrink-0 flex justify-center px-4"
                        style={{ width: '100%' }}
                    >
                        <div
                            className="w-full max-w-3xl aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700/50 shadow-2xl transform hover:scale-105 game-card"
                        >
                            <div className={`w-full h-full relative bg-gradient-to-br ${game.bgColor}`}>
                                {/* Glowing effects */}
                                <div className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 ${game.glowColor1} blur-2xl rounded-full`} />
                                <div className={`absolute bottom-1/4 right-1/4 w-1/3 h-1/3 ${game.glowColor2} blur-2xl rounded-full`} />
                                {/* Game title overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-xl font-bold">{game.title}</h3>
                                        <p className="text-blue-300 text-sm">{game.status}</p>
                                    </div>
                                    <div className="bg-blue-600/80 px-3 py-1 rounded text-white text-sm font-medium">
                                        {game.actionText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel Controls & Centered Indicators */}
            <div className="flex flex-col items-center mt-4 mb-4">
                <div className="flex justify-center space-x-2">
                    {games.map((_, index) => (
                        <button
                            key={`indicator-${index}`}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentSlide === index ? 'bg-blue-500 w-6' : 'bg-gray-500/50 hover:bg-gray-400/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}