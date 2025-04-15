import React, { useState } from 'react';

const AddReview = ({ movieId, onAddReview }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      user,
      rating,
      comment
    };

    try {
      const response = await fetch(`https://depi-back-production.up.railway.app/movies/${movieId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const savedReview = await response.json();
        onAddReview(savedReview); 
      } else {
        alert('Error adding review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group">
        <label htmlFor="user">User Name:</label>
        <input
          type="text"
          id="user"
          className="form-control"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          className="form-control"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary mt-2">
        Submit Review
      </button>
    </form>
  );
};

export default AddReview;
