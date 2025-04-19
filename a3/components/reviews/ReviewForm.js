import React, { useState } from 'react';

const ReviewForm = ({ onAddReview }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ comment, rating });
    setComment('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Review</h2>
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;