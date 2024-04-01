import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import swal from 'sweetalert';

function RatingComponent({ productId ,userId}) {
    const [rating, setRating] = useState(0);
    const { token } = useContext(AuthContext); // Assuming your AuthContext provides the auth token
    const submitRating = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${productId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming you're using a bearer token for authorization
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ rating, userId }),
      });
  
      if (response.ok) {
        swal("Thanks!", "Your rating has been submitted.", "success");
      } else {
        swal("Oops!", "Something went wrong.", "error");
      }
    };
  
    return (
      <div>
        {/* Basic example for rating. Implement as needed. */}
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              className={index <= rating ? 'text-yellow-500' : 'text-gray-400'}
              onClick={() => setRating(index)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
        <button onClick={submitRating}>Submit Rating</button>
      </div>
    );
  }
export default RatingComponent;