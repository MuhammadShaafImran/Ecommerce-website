import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Github, Twitter, Twitch, Youtube } from 'lucide-react';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setContactForm({
      ...contactForm,
      [field]: value
    });
  };

  const handleSendMessage = () => {
    // This would typically connect to your backend
    console.log('Form submitted:', contactForm);
    // Reset form after submission
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  return (
    <div className="text-gray-900">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Contact</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Us</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Have questions or need support? Our team is ready to help you with anything gaming related
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start group/item">
                    <div className="p-3 bg-blue-600/20 rounded-lg mr-4 group-hover/item:bg-blue-600/30 transition-colors">
                      <MapPin className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                      <p className="text-gray-400">123 Gaming Street, Digital City, 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="p-3 bg-purple-600/20 rounded-lg mr-4 group-hover/item:bg-purple-600/30 transition-colors">
                      <Phone className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group/item">
                    <div className="p-3 bg-pink-600/20 rounded-lg mr-4 group-hover/item:bg-pink-600/30 transition-colors">
                      <Mail className="text-pink-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
                      <p className="text-gray-400">support@gameempire.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-12">
                  <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-700/50 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 transition-all">
                      <Twitter size={18} className="text-current" />
                    </a>
                    <a href="#" className="bg-gray-700/50 p-3 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 transition-all">
                      <Twitch size={18} className="text-current" />
                    </a>
                    <a href="#" className="bg-gray-700/50 p-3 rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-all">
                      <Youtube size={18} className="text-current" />
                    </a>
                    <a href="#" className="bg-gray-700/50 p-3 rounded-lg hover:bg-gray-600/20 hover:text-gray-100 transition-all">
                      <Github size={18} className="text-current" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/input">
                      <label className="block text-gray-400 mb-2 text-sm font-medium">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent group-hover/input:border-gray-600/50 transition-colors"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div className="group/input">
                      <label className="block text-gray-400 mb-2 text-sm font-medium">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent group-hover/input:border-gray-600/50 transition-colors"
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="group/input">
                    <label className="block text-gray-400 mb-2 text-sm font-medium">Subject</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent group-hover/input:border-gray-600/50 transition-colors"
                      placeholder="How can we help?"
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    />
                  </div>
                  
                  <div className="group/input">
                    <label className="block text-gray-400 mb-2 text-sm font-medium">Message</label>
                    <textarea 
                      rows="5" 
                      className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent group-hover/input:border-gray-600/50 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={handleSendMessage}
                      className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 px-6 rounded-lg flex items-center transition-all duration-300"
                    >
                      Send Message
                      <Send size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;