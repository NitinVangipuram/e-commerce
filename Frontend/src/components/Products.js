import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
                // Extract unique categories
                const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error("There was an error!", error));
    }, []);

    const filterProducts = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    function calculateStars(averageRating) {
        let starOutput = '';
        const fullStars = Math.floor(averageRating);
        const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
      
        starOutput += '★'.repeat(fullStars);
        if (halfStar) {
          starOutput += '½';
        }
        starOutput += '☆'.repeat(emptyStars);
      
        return starOutput;
    }

    return (
        <div className="py-4 bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
                
                <Slider {...sliderSettings}>
                    {products.map((product) => (
                        <div key={product._id} className="px-2">
                            <Link to={`/product/${product._id}`}>
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow transition-shadow duration-300 ease-in-out flex flex-col hover:shadow-lg transform hover:-translate-y-1 hover:scale-105">
                                    <div className="h-56 flex justify-center items-center overflow-hidden">
                                        <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <span className="text-sm text-gray-500 mb-1">{product.category || "Category"}</span>
                                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                                        <div className="flex items-center mb-2">
                                            <span className="text-yellow-400 text-xs">{calculateStars(product.averageRating)}</span>
                                            <span className="text-gray-500 text-xs ml-2">({product.ratings.length} reviews)</span>
                                        </div>
                                        <p className="text-gray-800 font-medium mt-auto">₹{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>

                <div className="my-12">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Shop by Category</h2>
                    <div className="flex justify-center flex-wrap gap-6">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`py-3 px-8 rounded-full text-sm font-medium transition-all duration-150 ease-in-out transform hover:scale-105 ${
                                    activeCategory === category ? 'bg-gray-800 text-white shadow-lg' : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md border border-gray-200'
                                }`}
                                onClick={() => filterProducts(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <h2 className="text-3xl font-semibold mb-6 text-center">Our Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="px-2">
                            <Link to={`/product/${product._id}`}>
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow transition-shadow duration-300 ease-in-out flex flex-col hover:shadow-lg transform hover:-translate-y-1 hover:scale-105">
                                    <div className="h-56 flex justify-center items-center overflow-hidden">
                                        <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <span className="text-sm text-gray-500 mb-1">{product.category || "Category"}</span>
                                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                                        <div className="flex items-center mb-2">
                                            <span className="text-yellow-400 text-xs">{calculateStars(product.averageRating)}</span>
                                            <span className="text-gray-500 text-xs ml-2">({product.ratings.length} reviews)</span>
                                        </div>
                                        <p className="text-gray-800 font-medium mt-auto">₹{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
