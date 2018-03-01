import React from 'react';
import styles from './styling/ReviewListEntry.css';

const ReviewListEntry = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <img src={props.review.userImage} className={styles.picture}/>
        <p className={styles.username}>{props.review.userName}</p>
        <p className={styles.location}>{props.review.userLocation}</p>
        <span className={styles.belowUser}>{props.review.userReviews} <i class="far fa-edit"></i></span>
        <span className={styles.belowUser}>{props.review.userThumbs} <i class="fas fa-thumbs-up"></i></span>
      </div>
      <div>
        <div>
          <span>{`${props.review.rating} STAR(S)!`}</span>
          <span className={styles.date}>{`Reviewed ${props.review.howRecent}`}</span>
        </div>
        <div className={styles.comment}>
          <p className={styles.headline}>{props.review.reviewHeadline}</p>
          <p className={styles.review}>{props.review.comment}</p>
        </div>
        <div>
          <a href='#' className={styles.ask}>{`Ask ${props.review.userName} about ${props.review.location}`}</a>
          <button className={styles.button}><span className={styles.thumb}><i class="fas fa-thumbs-up"></i></span>{`Thank ${props.review.userName}`}</button>
          <p className={styles.bottomnote}><em>This review is the subjective opinion of a Nomad member and not of Nomad LLC.</em></p>
        </div>
      </div>
    </div>
  )
}

export default ReviewListEntry;