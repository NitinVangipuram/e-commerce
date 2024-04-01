import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../utils/productService';
import { useContext } from 'react'; // Import useContext hook
import { useCart } from '../context/CartContext'; // Import useCart hook
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import RatingComponent from './RatingsComponent'; // Adjust path as necessary
import swal from 'sweetalert';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Destructure addToCart method from context
  const { user } = useContext(AuthContext); // Destructure user from AuthContext

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        navigate('/404'); // Redirect to Not Found page
      }
    };
    fetchProduct();
  }, [productId, navigate]);


  const handleAddToCart = async () => {
    if (!user) {
      swal({
        title: "Not logged in",
        text: "Please log in to add items to the cart",
        icon: "warning",
        button: "Go to Login",
      }).then((value) => {
        navigate('/login'); // Redirect to login page
      });
      return;
    }
  
    // Use the user's ID from the AuthContext
    const userId = user.id; // Adjust according to how user ID is stored
    const quantity = 1; // Set quantity, or adjust as needed
    try {
      await addToCart(userId, product._id, quantity);
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



  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={`inline-block ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>);
    }
    return <div className="flex">{stars}</div>;
  };

  const handleBuyNow = () => {
    navigate('/payment');
  };

  return (
    <div className="bg-white min-h-screen py-8">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
    <div className="lg:col-span-2 flex justify-center"> {/* Center the image container */}
      {/* Adjust the image size and remove shadow */}
      <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="max-w-full h-auto max-h-96" style={{ objectFit: 'contain' }}/>
    </div>
    <div>
      <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-3">{renderStars(product.averageRating)}</div>
    
       {user && <RatingComponent productId={productId} userId={user.id} />}

      <p className="mt-4 text-lg text-gray-600">{product.description}</p>
      <p className="mt-4 text-2xl font-semibold text-gray-900">${product.price}</p>
      <div className="mt-6">
        <button className="mr-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>
    </div>
    <div className="lg:col-span-3 mt-12 lg:mt-0">
      <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
      {/* Sample Review */}
      <div className="mt-4">
        <div className="border-t border-gray-200 pt-4">
          <p className="italic text-gray-600">"This product exceeded my expectations. Highly recommend!"</p>
          <div className="mt-2">{renderStars(5)}</div>
          <p className="mt-1 text-sm text-gray-500">- Jane Doe</p>
        </div>
        {/* Add more reviews here */}
      </div>
    </div>
  </div>
</div>

  );
}

export default ProductDetailPage;
