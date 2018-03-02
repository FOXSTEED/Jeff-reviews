import React from 'react';
import styles from './styling/TryAgain.css';

const TryAgain = (props) => {
  return (
    <div className={styles.try}>No matches found. Please try again.<a onClick={() => props.reset()} className={styles.clear} href='#'>Clear search</a></div>
  )
}

export default TryAgain;