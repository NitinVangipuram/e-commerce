const express = require('express');
const Cart = require('../models/Cart'); // Adjust the path as needed
const router = express.Router();

// Fetch user's cart
router.get('/:userId', async (req, res) => {
  try {
    console.log('Fetching cart for user:', req.params.userId);
    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
    console.log('Cart:', cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log('Request body:', req.body);
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create a new cart if not exists
      cart = new Cart({ user: userId, items: [{ product: productId, quantity }] });
    } else {
      // Add product to cart or update quantity if it already exists
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = quantity;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
const savedCart = await cart.save();
console.log('Saved cart:', savedCart);
res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
