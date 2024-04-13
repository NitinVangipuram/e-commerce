const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: {
    type: String,
    required: true
  },
  rating: Number,
  message: String,
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  propertyDescription: {
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
  images: [{
    type: String,
  }],
  ratings: [ratingSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  aboutThisItem: [{
    type: String
  }],
  additionalInformation: {
    type: Map,
    of: String
  },
  category: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('product', ProductSchema);
