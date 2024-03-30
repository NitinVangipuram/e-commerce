import React, { useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    inStock: true,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    Object.keys(productInfo).forEach(key => formData.append(key, productInfo[key]));

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center"> {/* Flex utilities to center the form */}
      <div className="max-w-2xl mx-auto p-8 h-full">
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input 
            type="text" 
            name="name" 
            value={productInfo.name} 
            onChange={handleChange} 
            placeholder="Name" 
            required 
            className="input input-bordered w-full p-2 border-2 border-gray-300 rounded-md" // Added padding, border, and rounded corners
          />
          <input 
            type="text" 
            name="description" 
            value={productInfo.description} 
            onChange={handleChange} 
            placeholder="Description" 
            className="input input-bordered w-full p-2 border-2 border-gray-300 rounded-md" // Added padding, border, and rounded corners
          />
          <input 
            type="number" 
            name="price" 
            value={productInfo.price} 
            onChange={handleChange} 
            placeholder="Price" 
            required 
            className="input input-bordered w-full p-2 border-2 border-gray-300 rounded-md" // Added padding, border, and rounded corners
          />
          <label className="flex items-center space-x-3">
            <span>In Stock:</span>
            <input 
              type="checkbox" 
              name="inStock" 
              checked={productInfo.inStock} 
              onChange={() => setProductInfo({ ...productInfo, inStock: !productInfo.inStock })} 
              className="checkbox" // You may want to style the checkbox separately as it's a different kind of input
            />
          </label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            required 
            className="file:btn file:btn-primary p-2 border-2 border-gray-300 rounded-md" // Added padding, border, and rounded corners for file input
          />
          <button 
            type="submit" 
            className="btn btn-primary mt-4" // Adjust button styling as needed
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;
