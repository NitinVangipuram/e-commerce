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
      await removeFromCart(productId , user.id); // Assume removeFromCart handles the API call and state update
      console.log(`Removed item with id: ${productId}`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="container bg-gray-100 mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      {cart && cart.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {cart.map((item) => (
            <div key={item.product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`http://localhost:5000/${item.product.images[0]}`}
                alt={item.product.name}
                className="w-full h-48 object-contain mx-auto"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.product.name}</h3>
                <p className="text-gray-700 mb-4">{item.product.productDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">₹{item.product.price}</span>
                  <button
                    className="py-3 px-8 bg-red-500 hover:bg-red-700 text-white font-medium rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 shadow-md"
                    onClick={() => handleRemoveFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
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
