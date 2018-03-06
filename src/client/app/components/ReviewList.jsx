import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

const ReviewList = (props) => {
  return (
    <div>
      {props.reviews.map(review => <ReviewListEntry review={review} />)}
    </div>
  );
};


export default ReviewList;
