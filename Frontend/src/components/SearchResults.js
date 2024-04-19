import React from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext  } from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function SearchResults() {
    const location = useLocation();
    const { filteredProducts } = location.state || { filteredProducts: [] };
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
                    &#9733;
                </span>
            );
        }
        return stars;
    };
    const handleAddToCart = async (productId) => {
        if (!user) {
          swal({
            title: "Not logged in",
            text: "Please log in to add items to the cart",
            icon: "warning",
            button: "Go to Login",
          }).then((value) => {
            navigate('/login');
          });
          return;
        }
        try {
          await addToCart(user.id, productId, 1);
          swal({
            title: "Success!",
            text: "Added to cart successfully!",
            icon: "success",
            button: "Awesome!",
          });
        } catch (error) {
          console.error('Failed to add product to cart:', error);
          swal({
            title: "Failed!",
            text: "Failed to add product to cart.",
            icon: "error",
            button: "OK",
          });
        }
      };
    return (
        <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-5">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                   
                    <div key={index} className="flex flex-col border rounded-lg overflow-hidden shadow-lg">
                    
                    <div className="h-56 flex justify-center items-center overflow-hidden">
                    
                    <img 
    src={`http://localhost:5000/${product.images[0]}`} 
    alt={product.name} 
    className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
    onClick={() => navigate(`/product/${product._id}`)} 
/>


      </div>
                        <div className="p-4 flex flex-1 flex-col">
                            <h5 className="text-lg font-bold">{product.name}</h5>
                            <p className="text-gray-600 text-sm flex-1">{product.aboutThisItem[0].substring(0, 150)}...</p>
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-yellow-500 text-sm">
                                    {renderStars(product.averageRating)}
                                </div>
                                <span className="text-xl font-semibold">${product.price}</span>
                            </div>
                            <button 
    className="mt-3 w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300"
    onClick={() => handleAddToCart(product._id)}
>
    Add to Cart
</button>

                        </div>
                 
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
