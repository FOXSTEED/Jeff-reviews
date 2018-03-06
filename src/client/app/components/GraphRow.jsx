import React from 'react';
import styles from './styling/Graph.css';

const GraphRow = (props) => {
  return (
    <li>
      <div onClick={(e) => props.handleRating(e)} className={styles.rating}>{props.data.rating}</div><span className={styles.bar}><span style={{width: `${props.data.percentage}%`}} className={styles.innerBar}></span></span><span>{props.data.count}</span>
    </li>
  );
};

export default GraphRow;
