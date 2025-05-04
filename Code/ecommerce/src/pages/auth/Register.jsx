import { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {registerUser} from '../../api/auth/write'; 

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [ischecked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const registerForm = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!ischecked) {
      alert('Please agree to the terms and conditions');
      return;
    }
    console.log('Form submitted:', formData);
    result = await registerUser(formData);
    if (result) {
      alert('Registration successful!');
      navigate('/login');
    } else{
      alert('Registration failed! Please try again.');
    }

  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow flex justify-center items-center py-8">
        <div className="w-full max-w-md px-6">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h1 className="text-4xl font-serif text-center mb-6">Create account</h1>
            
            <div className="mb-6 text-center">
              <span className="text-gray-800">Already have an account? </span>
              <Link to="/login" className="text-teal-600 hover:underline">Log in</Link>
            </div>
            
            <form onSubmit={registerForm}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="email@example.com"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-800 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  name='username'
                  required
                />
              </div>
              
              <div className="mb-4 relative">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="block text-gray-800"> Password</label>
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
                  name = 'password' 
                  value = {FormData.password}
                  onChange = {handleChange} required
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with numbers and letters</p>
              </div>
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input type="checkbox" className="h-5 w-5 border border-gray-300 rounded mt-1" onClick={()=> setChecked(!ischecked)} />
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