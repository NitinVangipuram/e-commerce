import React, { useState } from 'react';
import swal from 'sweetalert';

function RatingComponent({ productId, userId, initialRating }) {
    const [rating, setRating] = useState(initialRating || 0);
    const [message, setMessage] = useState(""); // State for the message

    const submitRating = async () => {
      if (!rating) {
        swal("Notice", "Please select a rating before submitting.", "info");
        return;
      }

      // Additional validation for the message can be added here

      const response = await fetch(`http://localhost:5000/api/products/${productId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ rating, userId, message }), // Include message in the request body
      });

      if (response.ok) {
        swal("Thanks!", "Your rating and message have been submitted.", "success");
        // Reset form or handle as needed here
      } else {
        swal("Oops!", "Something went wrong.", "error");
      }
    };

    return (
      <div>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                key={index}
                className={`text-4xl ${index <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setRating(index)}
              >
                ★
              </button>
            );
          })}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message (optional)"
          className="mt-2 p-2 border rounded"
          rows="4"
          style={{ width: '100%' }}
        ></textarea>
        <div className="mt-2">
          <button 
            onClick={submitRating} 
            className="mt-4 bg-gray-900 hover:bg-black text-white font-bold py-2 px-6 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
}

export default RatingComponent;
