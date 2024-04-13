import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // If your API requires authentication, make sure to include the necessary Authorization header
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCart(data.items || []); // Update to match the structure of your response. Assuming the items are in `data.items`.
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  
  const removeFromCart = async (productId, userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId , userId}) // Including userId and productId in the body
      });
  
      if (response.ok) { // More robust check for successful response (ok checks for any 2xx status)
        setCart(currentCart => currentCart.filter(item => item.product._id !== productId));
      } else {
        // If the response is not ok, throw an error with the status text
        throw new Error(`Failed to remove the item: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error removing item from cart', error);
    }
  };
  

  const addToCart = async (userId, productId, quantity) => {
    const response = await fetch(`http://localhost:5000/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      
    setCart(response.data);
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart ,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
