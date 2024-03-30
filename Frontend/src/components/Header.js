import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as necessary
import swal from 'sweetalert';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // Destructure isAuthenticated and logout from context

  const handleLogout = () => {
    // Show SweetAlert confirmation dialog
    swal({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willLogout) => {
      if (willLogout) {
        logout(); // Call the logout method from your AuthContext
        swal("Logged out successfully!", {
          icon: "success",
        });
      } else {
        swal("Your session is safe!");
      }
    });
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center py-5 px-2 text-gray-400 hover:text-gray-200">
            <span className="font-bold">Brand</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="py-5 px-3 hover:text-gray-300">Login</Link>
              
          
                <Link to="/register" className="py-5 px-3 hover:text-gray-300">Register</Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="py-5 px-3 hover:text-gray-300">Cart</Link>
                <button onClick={handleLogout} className="py-5 px-3 hover:text-gray-300 cursor-pointer">Logout</button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-700">Login</Link>
            <Link to="/register" className="block py-2 px-4 text-sm hover:bg-gray-700">Register</Link>
          </>
        ) : (
          <>
            <Link to="/cart" className="block py-2 px-4 text-sm hover:bg-gray-700">Cart</Link>
            <button onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-gray-700 w-full text-left">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
