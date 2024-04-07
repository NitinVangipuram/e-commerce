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
<div className="h-screen flex justify-center items-center bg-gray-100">
  <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg"> {/* Adjusted max width for a wider form */}
    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Added responsiveness for larger screens */}
      <input
        type="text"
        name="name"
        value={productInfo.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="input input-bordered w-full p-4 text-gray-700 bg-gray-50 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        value={productInfo.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="input input-bordered w-full p-4 text-gray-700 bg-gray-50 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        value={productInfo.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
        className="textarea textarea-bordered w-full p-4 text-gray-700 bg-gray-50 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500 md:col-span-2" // Description field spans 2 columns on larger screens
      />
      <label className="flex items-center space-x-3 cursor-pointer md:col-span-2"> {/* Spanning full width for consistency */}
        <span className="text-gray-700">In Stock:</span>
        <input
          type="checkbox"
          name="inStock"
          checked={productInfo.inStock}
          onChange={() => setProductInfo({ ...productInfo, inStock: !productInfo.inStock })}
          className="toggle toggle-accent"
        />
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        required
        className="file:btn file:btn-block file:btn-accent p-2 rounded-lg md:col-span-2" // Spanning full width for file input
      />
      <button
        type="submit"
        className="btn btn-block btn-accent p-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors md:col-span-2" // Button spans full width on larger screens
      >
        Add Product
      </button>
    </form>
  </div>
</div>

  );
}

export default AdminPage;
