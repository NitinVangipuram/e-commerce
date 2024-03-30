import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate(); // Updated for v6

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authContext.login(email, password);
      toast.success("Login successful!", {
        onClose: () => navigate('/') // Navigate when the toast is closed.
      });
    } catch (error) {
      console.error(error);
      // Display an error toast if login fails
      toast.error(error.message || "Login failed. Please check your credentials.");
    }
  };

// Assuming you have a state and a function to handle login, add Tailwind classes for styling
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input  id="email-address"
  name="email"
  type="email"
  autoComplete="email"
  required 
  placeholder="Email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"  />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password"
              value={password}
  onChange={(e) => setPassword(e.target.value)}
   autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>
  
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <ToastContainer /> 
    </div>
  );
}  

export default LoginPage;
