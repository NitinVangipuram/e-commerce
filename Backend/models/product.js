const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: Number,
  message: String, // Add this line to include a message with the rating
}, { timestamps: true }); // Optional: add timestamps to keep track of when the rating was submitted

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
  ratings: [ratingSchema], // Use the defined ratingSchema for ratings
  averageRating: {
    type: Number,
    default: 0,
  },
  
});

module.exports = mongoose.model('product', ProductSchema);
