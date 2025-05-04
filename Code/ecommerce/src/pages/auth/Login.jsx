import { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { validateLogin} from '../../utils/authenticate';
import { getUserByEmailOrUsername } from '../../api/auth/read';


export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [ischecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login User:', formData);
    try {
      const userID = await getUserByEmailOrUsername(formData);
      console.log('UserID:', userID);
      
      if (userID) {
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Login failed! Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center py-8">
        <div className="w-full max-w-md px-6">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h1 className="text-4xl font-serif text-center mb-6">Log in</h1>
            
            <div className="mb-6 text-center">
              <span className="text-gray-800">Need a Mailchimp account? </span>
              <Link to= "/register" className="text-teal-600 hover:underline">Create an account </Link>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="usernameOrEmail" className="block text-gray-800 mb-2">Username or Email</label>
                <input
                  type="text"
                  id="usernameOrEmail"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name = "usernameOrEmail"
                  value = {formData.usernameOrEmail}
                  onChange = {handleChange}
                />
              </div>
              
              <div className="mb-6 relative">
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
                  name = 'password'
                  value = {formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="h-5 w-5 border border-gray-300 rounded" onClick={()=>setChecked(!ischecked)} />
                  <span className="ml-2 text-gray-800">Keep me logged in</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-full hover:bg-teal-700 transition-colors"
              >
                Log in
              </button>
              
              <div className="mt-6 text-center space-y-3">
                <div className="flex justify-center space-x-2">
                  <a href="#" className="text-teal-600 hover:underline">Forgot username?</a>
                  <a href="#" className="text-teal-600 hover:underline">Forgot password?</a>
                </div>
                <div>
                  <a href="#" className="text-teal-600 hover:underline">Can't log in?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

    </div>
  );
}