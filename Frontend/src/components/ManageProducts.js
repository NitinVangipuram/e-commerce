import React, { useEffect, useState } from 'react';

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("There was an error!", error));
  }, []);

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
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-5">Manage Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="flex flex-col border rounded-lg overflow-hidden shadow-lg">
            <div className="h-56 flex justify-center items-center overflow-hidden">
        <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" />
      </div>
              <div className="p-4 flex flex-1 flex-col">
                <h5 className="text-lg font-bold">{product.name}</h5>
                <p className="text-gray-600 text-sm flex-1">{product.aboutThisItem[0].substring(0, 150)}...</p>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">No products available.</p>
      )}
    </div>
  );
}

export default ManageProducts;
