import { ArrowRight, Trophy, Users, Gamepad, HeadphonesIcon, Clock, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="text-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-gray-900">Welcome to </span>
                            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">GearUp Gaming</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Your ultimate destination for premium gaming peripherals and accessories. 
                            We're dedicated to enhancing your gaming setup with top-tier gear.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Our Story */}
                        <div className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <div className="p-3 bg-red-50 rounded-lg w-fit mb-6">
                                <Trophy className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Story</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Started by hardcore gamers, GearUp Gaming was established to provide 
                                fellow gamers with carefully curated, high-performance gaming peripherals 
                                that enhance every gaming moment.
                            </p>
                            <button className="group inline-flex items-center text-red-500 hover:text-red-600 transition-colors">
                                Learn more 
                                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Our Mission */}
                        <div className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <div className="p-3 bg-red-50 rounded-lg w-fit mb-6">
                                <Users className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                We're on a mission to elevate gaming experiences through premium 
                                peripherals, expert guidance, and a commitment to quality that 
                                helps every gamer achieve their peak performance.
                            </p>
                            <button className="group inline-flex items-center text-red-500 hover:text-red-600 transition-colors">
                                Learn more 
                                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Why Choose Us */}
                        <div className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <div className="p-3 bg-red-50 rounded-lg w-fit mb-6">
                                <Award className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Premium selection of gaming keyboards, mice, headsets, and controllers, 
                                backed by authentic reviews, competitive prices, and expert support 
                                to help you make informed decisions.
                            </p>
                            <button className="group inline-flex items-center text-red-500 hover:text-red-600 transition-colors">
                                Learn more 
                                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <Gamepad className="w-8 h-8 text-red-500 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">1000+</h4>
                            <p className="text-gray-600">Gaming Peripherals</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <Users className="w-8 h-8 text-red-500 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">20K+</h4>
                            <p className="text-gray-600">Satisfied Gamers</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <HeadphonesIcon className="w-8 h-8 text-red-500 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">15+</h4>
                            <p className="text-gray-600">Premium Brands</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
                            <Clock className="w-8 h-8 text-red-500 mx-auto mb-4" />
                            <h4 className="text-3xl font-bold text-gray-900 mb-2">24/7</h4>
                            <p className="text-gray-600">Tech Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The GearUp Gaming Experience</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We're more than just a store - we're your gaming gear experts, 
                            committed to helping you find the perfect peripherals for your setup.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-3">Expert Product Curation</h3>
                            <p className="text-gray-600">Every product in our catalog is thoroughly tested and approved by our team of gaming enthusiasts.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-3">Competitive Pricing</h3>
                            <p className="text-gray-600">We regularly monitor prices to ensure you get the best deals on premium gaming gear.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-3">Fast Shipping</h3>
                            <p className="text-gray-600">Quick delivery to get your new gaming peripherals in your hands as soon as possible.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-3">Product Warranty</h3>
                            <p className="text-gray-600">All our products come with manufacturer warranty and our satisfaction guarantee.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-3">Technical Support</h3>
                            <p className="text-gray-600">Our knowledgeable support team is always ready to help with setup and troubleshooting.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-xl font-bold mb-3">Gaming Community</h3>
                            <p className="text-gray-600">Join our community of gamers for tips, reviews, and discussions about gaming gear.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;