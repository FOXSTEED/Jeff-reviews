import React from 'react';
import styles from './styling/SearchWords.css';

const Word = (props) => {
  return (
    <div onClick={(e) => props.handleClick(e)} className={styles.buttons}>{props.word}</div>
  )
}

export default Word;