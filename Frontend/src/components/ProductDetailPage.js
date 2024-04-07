import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../utils/productService';
import { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import RatingComponent from './RatingsComponent';
import swal from 'sweetalert';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productService.getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        navigate('/404');
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
        navigate('/login');
      });
      return;
    }

    const userId = user.id;
    const quantity = 1;
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

  function renderStars(rating) {
    return [...Array(5)].map((star, index) => {
      const ratingValue = index + 1;
      return (
        <span key={ratingValue} className={`text-xl ${ratingValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    });
  }

  const handleBuyNow = () => {
    navigate('/payment');
  };

  return (
<div className="bg-white min-h-screen py-12">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div className="flex justify-center lg:justify-end">
      <div className="max-w-xl">
        <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
      </div>
    </div>
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-3 flex items-center">
        {product.averageRating && (
          <>
            <div className="text-xl font-semibold text-gray-800">{product.averageRating.toFixed(1)}</div>
            <div className="ml-2">{renderStars(product.averageRating)}</div>
          </>
        )}
      </div>
      <p className="mt-6 text-gray-700">{product.description}</p>
      <p className="mt-6 text-2xl font-semibold text-gray-900">₹{product.price}</p>
      <div className="mt-8 flex gap-4">
      <button
  className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-8 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 shadow-md"
  onClick={handleAddToCart}
>
  Add to Cart
</button>
<button
  className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 shadow-md ml-4"
  onClick={handleBuyNow}
>
  Buy Now
</button>

      </div>
    </div>
  </div>

  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
    <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
    <div className="mt-6 space-y-6">
      {product && user && (
        <RatingComponent
          productId={productId}
          userId={user.id}
          initialRating={0}
        />
      )}
      {product.ratings && product.ratings.length > 0 ? (
  product.ratings.map((review) => (
    <div key={review._id} className="bg-white p-6 rounded-lg shadow mb-5 border border-gray-200">
      {/* Emphasize the reviewer's email with a larger font size */}
      <p className="text-lg font-semibold text-gray-700 mb-1">{review.email}</p>

      <div className="mt-4 flex items-center">
        <div>{renderStars(review.rating)}</div>
        {/* Display the rating next to the stars for quick visual reference */}
        <span className="ml-2 text-lg text-gray-600">{review.rating}/5</span>
      </div>
      {/* Message styling */}
      <p className="text-gray-800 mt-2 leading-relaxed">{review.message}</p>
      
      {/* Ratings display */}

      
      {/* Review date with subtle emphasis */}
      <p className="mt-4 text-sm text-gray-500">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  ))
) : (
  <p className="text-gray-600">No reviews yet.</p>
)}



    </div>
  </div>
</div>


  );
}

export default ProductDetailPage;
