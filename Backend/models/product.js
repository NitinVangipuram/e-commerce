const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  image: { // Add image path
    type: String,
    required: false, // Set based on your requirements
  },
});

module.exports = mongoose.model('product', ProductSchema);
