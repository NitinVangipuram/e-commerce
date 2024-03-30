import React, { useEffect, useContext } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the path as necessary
import { AuthContext } from '../context/AuthContext'; // Adjust the path as necessary

function CartPage() {
  const { cart, fetchCart } = useCart();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.id) {
      fetchCart(user.id);
    }
  }, [user]);

  return (
    <div className="container bg-gray-100 mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      {cart && cart.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {cart.map((item) => (
            <div key={item.product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`http://localhost:5000/${item.product.image}`} // Make sure this is the correct path to your image
                alt={item.product.name}
                className="w-full h-48 object-contain mx-auto" // Changed to object-contain with centering
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.product.name}</h3>
                <p className="text-gray-700 mb-4">{item.product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${item.product.price}</span>
                  {/* Implement the removeFromCart button and functionality if needed */}
                  <button
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    // onClick={() => removeFromCart(item.product._id)}
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
