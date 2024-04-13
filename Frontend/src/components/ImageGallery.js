import React, { useState } from 'react';

function ImageGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={`http://localhost:5000/${activeImage}`} alt="Product" className="w-full object-contain h-96" />
      </div>
      <div className="thumbnail-container flex justify-center gap-4 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${image}`}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover ${image === activeImage ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'} rounded cursor-pointer`}
            onClick={() => setActiveImage(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
