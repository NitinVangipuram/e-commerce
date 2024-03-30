require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const multer = require('multer');
const Product = require('./models/product');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const User = require('./models/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Keep original file's extension
    }
  });
  
  const upload = multer({ storage: storage });
  
connectDB();

app.use(express.json({ extended: false }));
app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.get('/api/products/:productId', async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  });
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
      const { name, description, price, inStock } = req.body;
      const image = req.file.path; // Path where the image is saved
  
      const newProduct = new Product({
        name,
        description,
        price,
        inStock: inStock === 'true', // Ensure correct boolean handling
        image,
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
