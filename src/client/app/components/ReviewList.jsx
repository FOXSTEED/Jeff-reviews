/* eslint-disable react/prop-types */

import React from 'react';
import ReviewListEntry from './ReviewListEntry';

const ReviewList = props => (
  <div>
    {props.reviews.map(review => <ReviewListEntry review={review} />)}
  </div>
);


export default ReviewList;
