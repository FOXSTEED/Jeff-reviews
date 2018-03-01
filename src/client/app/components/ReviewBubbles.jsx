import React from 'react';
import ReviewBubble from './ReviewBubble.jsx';

const ReviewBubbles = (props) => {
  const bubbles = [];
  const count = props.rating
  for (let i = 0; i < count; i++) {
    bubbles.push(<ReviewBubble />);
  }
  return (
    <span>{bubbles}</span>
  )
};

export default ReviewBubbles;