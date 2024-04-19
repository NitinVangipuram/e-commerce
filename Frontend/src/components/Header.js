import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';
import { MdShoppingCart, MdExitToApp, MdPersonAdd, MdLogin, MdSearch } from 'react-icons/md';
import { MdAdminPanelSettings, MdManageAccounts } from 'react-icons/md';

function Header() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { isAuthenticated, logout, user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error("There was an error!", error));
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    const handleLogout = () => {
        swal({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willLogout) => {
            if (willLogout) {
                logout();
                swal("Logged out successfully!", {
                    icon: "success",
                });
            } else {
                swal("Your session is safe!");
            }
        });
    };

    const handleSearch = (e) => {
      e.preventDefault();
      const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
      navigate('/search-results', { state: { filteredProducts: filtered } });
  };
    return (
        <nav className="bg-black text-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center py-5 px-2 text-gray-400 hover:text-gray-200">
                        {/* Brand logo or name */}
                        <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24">
                            {/* Placeholder SVG; replace with your logo */}
                        </svg>
                        <span className="font-bold">Brand</span>
                    </Link>
                    
                    {/* Search form */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center border-2 border-gray-700 rounded-lg overflow-hidden">
                        <input
                            className="p-2 pl-4 w-72 text-gray-700 focus:outline-none bg-white"
                            type="text"
                            name="search"
                            placeholder="Search products..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-gray-700 p-2 hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                        >
                            <MdSearch className="text-white" size="24" />
                        </button>
                    </form>

                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="py-5 px-3 hover:text-gray-300 flex items-center"><MdLogin className="mr-2"/>Login</Link>
                                <Link to="/register" className="py-5 px-3 hover:text-gray-300 flex items-center"><MdPersonAdd className="mr-2"/>Register</Link>
                            </>
                        ) : (
                            <>
                                {user && user.isAdmin && (
                                    <Link to="/admin" className="py-5 px-3 hover:text-gray-300 flex items-center"><MdAdminPanelSettings className="mr-2" />Admin</Link>
                                    
                                )}
                                {user && user.isAdmin && (
                                    <Link to="/manage-products" className="py-5 px-3 hover:text-gray-300 flex items-center"> <MdManageAccounts className="mr-2" />Manage Products</Link>
                                    
                                )}
                                <Link to="/cart" className="py-5 px-3 hover:text-gray-300 flex items-center"><MdShoppingCart className="mr-2"/>Cart</Link>
                                <button onClick={handleLogout} className="py-5 px-3 hover:text-gray-300 cursor-pointer flex items-center"><MdExitToApp className="mr-2"/>Logout</button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu and search form */}
            <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
                <form onSubmit={handleSearch} className="px-4">
                    <input
                        className="rounded-lg p-2 text-gray-700 leading-tight focus:outline-none w-full"
                        type="text"
                        name="search"
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="mt-2 w-full py-2 bg-gray-700 text-white rounded-lg mb-2"
                    >
                        <MdSearch className="inline mr-2"/>Search
                    </button>
                </form>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-700 flex items-center"><MdLogin className="mr-2"/>Login</Link>
                        <Link to="/register" className="block py-2 px-4 text-sm hover:bg-gray-700 flex items-center"><MdPersonAdd className="mr-2"/>Register</Link>
                    </>
                ) : (
                    <>
                        {user && user.isAdmin && (
                            <Link to="/admin" className="block py-2 px-4 text-sm hover:bg-gray-700 flex items-center"><MdAdminPanelSettings className="mr-2" />Admin</Link>
                        )}
                        {user && user.isAdmin && (
                                    <Link to="/manage-products" className="block py-2 px-4 text-sm hover:bg-gray-700 flex items-center" > <MdManageAccounts className="mr-2" />Manage Products</Link>
                                    
                                )}
                        <Link to="/cart" className="block py-2 px-4 text-sm hover:bg-gray-700 flex items-center"><MdShoppingCart className="mr-2"/>Cart</Link>
                        <Link onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-gray-700 flex items-center"><MdExitToApp className="mr-2"/>Logout</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
