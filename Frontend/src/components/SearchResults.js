import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
    const location = useLocation();
    const { filteredProducts } = location.state || { filteredProducts: [] };

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="px-4 py-6">
            <h1 className="text-2xl font-bold mb-5">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="flex flex-col border rounded-lg overflow-hidden shadow-lg">
                    <div className="h-56 flex justify-center items-center overflow-hidden">
        <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" />
      </div>
                        <div className="p-4 flex flex-1 flex-col">
                            <h5 className="text-lg font-bold">{product.name}</h5>
                            <p className="text-gray-600 text-sm flex-1">{product.aboutThisItem[0].substring(0, 150)}...</p>
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-yellow-500 text-sm">
                                    {renderStars(product.averageRating)}
                                </div>
                                <span className="text-xl font-semibold">${product.price}</span>
                            </div>
                            <button className="mt-3 w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
