import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        // Fetch products from the backend
        fetch('http://localhost:5000/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error("There was an error!", error));
    }, []);

    const categories = ['All', 'Men', 'Women', 'Kids', 'Sports'];
    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };
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

    return (
        <div className="py-4 bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
                <Slider {...sliderSettings}>
                    {products.map((product) => (
                        <div key={product._id} className="px-2">
                            <Link to={`/product/${product._id}`}>
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <div className="h-56 flex justify-center items-center overflow-hidden">
                                        <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{truncateText(product.name, 35)}</h3>
                                        <p className="text-gray-800 font-medium">${product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>

                <div className="my-12">
                    <h2 className="text-3xl font-semibold mb-6 text-center">Shop by Category</h2>
                    <div className="flex justify-center flex-wrap gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`py-2 px-6 rounded-lg font-semibold transition-colors duration-200 ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-300'}`}
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
                        <Link key={product._id} to={`/product/${product._id}`} className="block">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <div className="h-56 flex justify-center items-center overflow-hidden">
                                    <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{truncateText(product.name, 35)}</h3>
                                    <p className="text-gray-800 font-medium">${product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
