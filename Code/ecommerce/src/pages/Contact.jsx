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

  {/* Contact Us Section */}
  return (
    <div className="w-full text-gray-900">
      <section className="py-16 px-4 md:px-8 bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-blue-400">Contact</span> Us
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Have questions or need support? Our team is ready to help you with anything gaming related
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-6 rounded-lg h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                      <MapPin className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Our Location</h4>
                      <p className="text-gray-400 mt-1">123 Gaming Street, Digital City, 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                      <Phone className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone Number</h4>
                      <p className="text-gray-400 mt-1">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                      <Mail className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email Address</h4>
                      <p className="text-gray-400 mt-1">support@gameempire.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-8">
                  <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 transition-colors">
                      <Twitter size={18} className="text-white" />
                    </a>
                    <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-purple-600 transition-colors">
                      <Twitch size={18} className="text-white" />
                    </a>
                    <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-red-600 transition-colors">
                      <Youtube size={18} className="text-white" />
                    </a>
                    <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-gray-900 transition-colors">
                      <Github size={18} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Subject</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How can we help?"
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Message</label>
                    <textarea 
                      rows="5" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us more about your inquiry..."
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={handleSendMessage}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center transition-colors"
                    >
                      Send Message
                      <Send size={16} className="ml-2" />
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