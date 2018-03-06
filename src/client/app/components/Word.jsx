import React from 'react';
import styles from './styling/SearchWords.css';

const Word = (props) => {
  return (
    <button onClick={(e) => props.handleClick(e)} className={styles.buttons}>{props.word}</button>
  );
};

export default Word;
