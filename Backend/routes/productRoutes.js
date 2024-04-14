// routes/productRoutes.js
const express = require('express');
const Product = require('../models/product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:productId/rate', async (req, res) => {
  console.log('Request body:', req.body);
  const { rating, userId, message } = req.body;
  const { productId } = req.params;

  if (!rating) {
    return res.status(400).json({ message: 'Rating is required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user by userId to get their email
    const user = await User.findById(userId); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has already rated the product
    const existingRatingIndex = product.ratings.findIndex(r => r.userId.toString() === userId);

    if (existingRatingIndex !== -1) {
      // Update existing rating
      product.ratings[existingRatingIndex].rating = rating;
      product.ratings[existingRatingIndex].email = user.email; // Update email from the user model
      if (message) {
        product.ratings[existingRatingIndex].message = message;
      }
    } else {
      // Add new rating, including email from the user model
      product.ratings.push({ userId, rating, message, email: user.email });
    }

    // Recalculate average rating
    product.averageRating = product.ratings.reduce((acc, curr) => acc + curr.rating, 0) / product.ratings.length;

    await product.save();

    res.json({ message: 'Rating submitted successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});
// DELETE a product by ID
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Failed to delete the product:', error);
    res.status(500).json({ message: 'Failed to delete the product', error: error.message });
  }
});




module.exports = router;
