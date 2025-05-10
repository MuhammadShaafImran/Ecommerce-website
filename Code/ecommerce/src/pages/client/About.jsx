import { ArrowRight, Trophy, Users, Gamepad, HeadphonesIcon, Clock, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="text-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-gray-900">About</span>
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Game Empire</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Your premier destination for premium gaming gear and accessories. 
                            We're passionate about delivering exceptional gaming experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Our Story */}
                        <div className="group bg-gray-100 rounded-xl p-8 border border-gray-300 hover:border-blue-500 transition-all duration-300">
                            <div className="p-3 bg-blue-100 rounded-lg w-fit mb-6">
                                <Trophy className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Story</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Founded by passionate gamers, Game Empire was built to create 
                                a community where gaming enthusiasts can discover and experience 
                                the best in gaming technology.
                            </p>
                            <button className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                                Learn more 
                                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Our Vision */}
                        <div className="group bg-gray-100 rounded-xl p-8 border border-gray-300 hover:border-purple-500 transition-all duration-300">
                            <div className="p-3 bg-purple-100 rounded-lg w-fit mb-6">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We aim to revolutionize the gaming industry by providing an 
                                accessible platform that connects players with exceptional 
                                gaming gear across all preferences.
                            </p>
                            <button className="group inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                                Learn more 
                                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Why Choose Us */}
                        <div className="group bg-gray-100 rounded-xl p-8 border border-gray-300 hover:border-pink-500 transition-all duration-300">
                            <div className="p-3 bg-pink-100 rounded-lg w-fit mb-6">
                                <Award className="w-6 h-6 text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Exclusive deals, curated selection of premium gear, early access 
                                to upcoming releases, and dedicated 24/7 support to enhance 
                                your gaming journey.
                            </p>
                            <button className="group inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors">
                                Learn more 
                                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-blue-500 transition-all duration-300">
                            <Gamepad className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">500+</h4>
                            <p className="text-gray-600">Products Available</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-purple-500 transition-all duration-300">
                            <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">50K+</h4>
                            <p className="text-gray-600">Happy Customers</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-pink-500 transition-all duration-300">
                            <HeadphonesIcon className="w-8 h-8 text-pink-400 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">10+</h4>
                            <p className="text-gray-600">Gaming Partners</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-indigo-500 transition-all duration-300">
                            <Clock className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">24/7</h4>
                            <p className="text-gray-600">Customer Support</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;