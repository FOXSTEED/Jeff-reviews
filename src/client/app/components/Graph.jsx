import React from 'react';
import GraphRow from './GraphRow.jsx';
import styles from './styling/Graph.css';

const Graph = (props) => {
  return (
    <div className={styles.main}>
      <p className={styles.header}>Traveler rating</p>
      <ul className={styles.list}>
        {props.graphInfo.map(rating => <GraphRow data={rating} handleRating={props.handleRating} />)}
      </ul>
    </div>
  );
};

export default Graph;
