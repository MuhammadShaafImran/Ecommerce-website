import { useState } from 'react';
import { Eye } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo and Language Selector */}
      {/* <header className="w-full flex justify-between items-center p-4">
        <div className="pl-4">
          <svg width="40" height="40" viewBox="0 0 100 100" className="text-black">
            <path fill="currentColor" d="M89.2,42.8c-1.7-2.3-5.4-2.7-7.9-0.8c-0.5,0.4-0.9,0.9-1.3,1.5c-1.1-1.2-2.5-2-4.1-2.4 c-2.3-0.5-4.9,0-6.5,1.9c-0.4-3.1-2.9-5.8-6.3-5.8c-1.5,0-3,0.6-4.2,1.5c-1.4-4.3-7.2-5.8-11-2.7c-1.7-1.9-4.1-3-6.6-3 c-5,0-9,4-9,9c0,0.3,0,0.6,0.1,0.9c-4,0.8-7,4.3-7,8.5c0,4.7,3.8,8.5,8.5,8.5h47c4.7,0,8.5-3.8,8.5-8.5 C91,46.7,90.4,44.5,89.2,42.8z"/>
            <path fill="black" d="M41.7,71.8c-2.6,0-4.7-2.1-4.7-4.7c0-2.6,2.1-4.7,4.7-4.7s4.7,2.1,4.7,4.7C46.4,69.7,44.3,71.8,41.7,71.8z"/>
          </svg>
        </div>
        <div className="flex items-center pr-4">
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
            <svg className="w-5 h-5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h.01M15 10h.01M12 14v-4" />
            </svg>
            <span className="ml-1 text-teal-600 font-medium">English</span>
            <svg className="w-4 h-4 ml-1 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center py-8">
        <div className="w-full max-w-md px-6">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h1 className="text-4xl font-serif text-center mb-6">Create account</h1>
            
            <div className="mb-6 text-center">
              <span className="text-gray-800">Already have an account? </span>
              <a href="#" className="text-teal-600 hover:underline">Log in</a>
            </div>
            
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-800 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Choose a username"
                />
              </div>
              
              <div className="mb-4 relative">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-gray-800">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-teal-600 flex items-center"
                  >
                    <Eye size={18} className="mr-1" />
                    <span>Show</span>
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Create a password"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with numbers and letters</p>
              </div>
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input type="checkbox" className="h-5 w-5 border border-gray-300 rounded mt-1" />
                  <span className="ml-2 text-sm text-gray-800">
                    I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and 
                    <a href="#" className="text-teal-600 hover:underline"> Privacy Policy</a>, and I consent to receiving updates from Mailchimp.
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-full hover:bg-teal-700 transition-colors"
              >
                Sign Up
              </button>
              
              <div className="mt-6">
                <p className="text-xs text-gray-500 text-center">
                  By creating an account, you agree to our <a href="#" className="text-teal-600 hover:underline">Terms</a> and have read and acknowledge our <a href="#" className="text-teal-600 hover:underline">Privacy Statement</a>.
                </p>
              </div>
              
              <div className="mt-6">
                <p className="text-xs text-gray-500 text-center">
                  This site is protected by reCAPTCHA and the Google <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> apply.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer
      <footer className="w-full p-4 text-center text-gray-600 text-sm">
        <div>
          ©2024 Intuit Inc. All rights reserved. Mailchimp® is a registered trademark of The Rocket Science Group, 
          <a href="#" className="text-gray-600 hover:underline mx-1">Cookie Preferences</a>,
          <a href="#" className="text-gray-600 hover:underline mx-1">Privacy</a>, and
          <a href="#" className="text-gray-600 hover:underline mx-1">Terms</a>
        </div>
      </footer> */}
    </div>
  );
}