import React, { useEffect, useState } from 'react';

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  const handleEdit = (productId) => {
    console.log('Editing product', productId);
    // Implementation would go here
  };

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
      }
    })
    .catch(error => console.error("Failed to delete the product!", error));
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg">
          <div className="h-56 flex justify-center items-center overflow-hidden">
        <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" />
      </div>
            <div className="p-4">
              <h5 className="text-lg font-bold">{product.name}</h5>
              <p className="text-gray-600 text-sm my-2">{product.description}</p>
              <div className="flex justify-between mt-3">
                {/* <button onClick={() => handleEdit(product._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                  Edit
                </button> */}
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;
