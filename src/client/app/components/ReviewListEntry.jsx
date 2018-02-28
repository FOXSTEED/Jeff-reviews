import React from 'react';

const ReviewListEntry = (props) => {
  return (
    <div>
      <div>
        <img src={props.review.userImage} />
        <span>{props.review.userName}</span>
        <span><strong>{props.review.userLocation}</strong></span>
      </div>
      <div>
        <span>{`${props.review.rating} STAR(S)!`}</span>
        <span>{`Reviewed on ${props.review.date}`}</span>
      </div>
      <div>
        <p>{props.review.reviewHeadline}</p>
        <p>{props.review.comment}</p>
      </div>
      <div>
        <span>{`Ask ${props.review.userName} about Pearl Harbor`}</span>
        <p><em>This review is the subjective opinion of a TripAdvisor member and not of TripAdvisor LLC.</em></p>
      </div>
    </div>
  )
}

export default ReviewListEntry;