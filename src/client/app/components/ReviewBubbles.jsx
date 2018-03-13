/* eslint-disable react/prop-types */

import React from 'react';
import ReviewBubble from './ReviewBubble';

const ReviewBubbles = (props) => {
  const bubbles = [];
  const count = props.rating;
  for (let i = 0; i < count; i += 1) {
    bubbles.push(<ReviewBubble />);
  }
  return (
    <span>{bubbles}</span>
  );
};

export default ReviewBubbles;
