import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p><strong>{review.user}</strong>: {review.comment}</p>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;