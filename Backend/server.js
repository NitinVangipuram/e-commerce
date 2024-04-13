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
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
      // Create a unique file name to prevent any naming conflicts
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
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
  app.post('/api/products', upload.array('images', 10), async (req, res) => {
    console.log(req.files);  // Check the files array
    console.log(req.body);
    try {
        const {
            name,
            propertyDescription,
            price,
            inStock,
            aboutThisItem,
            additionalInformation,
            category
        } = req.body;
  
        const imagePaths = req.files.map(file => file.path); // Get paths of all uploaded files
  
        const aboutItemArray = JSON.parse(aboutThisItem || '[]');
        const additionalInfoObject = JSON.parse(additionalInformation || '{}');
  
        const newProduct = new Product({
            name,
            propertyDescription,
            price,
            inStock: inStock === 'true', // Ensure correct boolean handling
            images: imagePaths, // Save array of images
            aboutThisItem: aboutItemArray,
            additionalInformation: additionalInfoObject,
            category
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
