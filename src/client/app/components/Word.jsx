import React from 'react';
import styles from './styling/SearchWords.css';

const Word = (props) => {
  return (
    <div className={styles.buttons}>{props.word}</div>
  )
}

export default Word;