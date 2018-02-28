import React from 'react';
import styles from './styling/ReviewListEntry.css';

const ReviewListEntry = (props) => {
  return (
    <div>
      <div className={styles.user}>
        <img src={props.review.userImage} className={styles.picture}/>
        <p className={styles.username}>{props.review.userName}</p>
        <p className={styles.location}>{props.review.userLocation}</p>
      </div>
      <div>
        <span>{`${props.review.rating} STAR(S)!`}</span>
        <span>{`Reviewed on ${props.review.date}`}</span>
      </div>
      <div>
        <p className={styles.headline}>{props.review.reviewHeadline}</p>
        <p className={styles.review}>{props.review.comment}</p>
      </div>
      <div>
        <span>{`Ask ${props.review.userName} about Pearl Harbor`}</span>
        <p><em>This review is the subjective opinion of a TripAdvisor member and not of TripAdvisor LLC.</em></p>
      </div>
    </div>
  )
}

export default ReviewListEntry;