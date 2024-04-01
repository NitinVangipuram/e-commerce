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
  const { rating, userId } = req.body; // Assuming userId is passed in the request body
  const { productId } = req.params;


  if (!rating) {
    return res.status(400).json({ message: 'Rating is required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   

    // Check if the user has already rated the product
    const existingRatingIndex = product.ratings.findIndex(r => r.userId.toString() === userId);

    if (existingRatingIndex !== -1) {
      // Update existing rating
      product.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      product.ratings.push({ userId, rating });
    }

    // Recalculate average rating
    product.averageRating = product.ratings.reduce((acc, curr) => acc + curr.rating, 0) / product.ratings.length;

    await product.save();

    res.json({ message: 'Rating submitted successfully', product });
  } catch (error) {
    console.error(error); // Logging the error can help with debugging
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
