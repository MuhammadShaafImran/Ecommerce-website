import { ArrowRight} from 'lucide-react';

const About = () => {
    return (
        <div className="w-full bg-white text-gray-900">
            {/* About Us Section */}
            <section className="py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="text-blue-400">About</span> Game Empire
                        </h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
                        <p className="text-gray-400 max-w-3xl mx-auto">
                            Experience the ultimate gaming destination where passion meets technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {/* Our Story */}
                        <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500 hover:transform hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-4">Our Story</h3>
                            <p className="text-gray-400">
                                Founded in 2018 by a team of passionate gamers, Game Empire was built with a simple mission: to create a community where gamers can discover, discuss, and enjoy the best gaming experiences.
                            </p>
                            <button className="flex items-center mt-4 text-blue-400 hover:text-blue-300 transition-colors">
                                Learn more <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>

                        {/* Our Vision */}
                        <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500 hover:transform hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-gray-400">
                                We aim to revolutionize the gaming industry by providing an accessible platform that connects players with exceptional games across all genres, platforms, and preferences.
                            </p>
                            <button className="flex items-center mt-4 text-blue-400 hover:text-blue-300 transition-colors">
                                Learn more <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500 hover:transform hover:scale-105 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-4">Why Choose Us</h3>
                            <p className="text-gray-400">
                                Exclusive deals, a curated selection of top titles, early access to upcoming releases, and a dedicated support team available 24/7 to enhance your gaming journey.
                            </p>
                            <button className="flex items-center mt-4 text-blue-400 hover:text-blue-300 transition-colors">
                                Learn more <ArrowRight size={16} className="ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        <div className="text-center">
                            <h4 className="text-4xl font-bold text-blue-400 mb-2">500+</h4>
                            <p className="text-gray-400">Games Available</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-bold text-blue-400 mb-2">50K+</h4>
                            <p className="text-gray-400">Active Players</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-bold text-blue-400 mb-2">10+</h4>
                            <p className="text-gray-400">Gaming Partners</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-4xl font-bold text-blue-400 mb-2">24/7</h4>
                            <p className="text-gray-400">Customer Support</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;