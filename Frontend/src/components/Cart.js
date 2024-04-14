import React, { useEffect, useContext } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCart(); // Assuming removeFromCart is available from context
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.id) {
      fetchCart(user.id);
    }
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId, user.id); // Assume removeFromCart handles the API call and state update
      console.log(`Removed item with id: ${productId}`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

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

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-5">Your Cart</h2>
      {cart && cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.product._id} className="flex flex-col border rounded-lg overflow-hidden shadow-lg">
            <div className="h-56 flex justify-center items-center overflow-hidden">
        <img src={`http://localhost:5000/${item.product.images[0]}`} alt={item.product.name} className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" />
      </div>
              <div className="p-4 flex flex-1 flex-col">
                <h5 className="text-lg font-bold">{item.product.name}</h5>
                
                <p className="text-gray-600 text-sm flex-1">{item.product.aboutThisItem[0].substring(0, 150)}...</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-yellow-500 text-sm">
                    {renderStars(item.product.averageRating || 0)}
                  </div>
                  <span className="text-xl font-semibold">${item.product.price}</span>
                </div>
                <button
                  className="mt-3 w-full py-2 bg-red-500 hover:bg-red-700 text-white rounded transition duration-300"
                  onClick={() => handleRemoveFromCart(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;
