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
  ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('product', ProductSchema);
