import React from 'react';
import styles from './styling/Graph.css';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClick(e) {
    let rating = {
      'Excellent': 5,
      'Very good': 4,
      'Average': 3,
      'Poor': 2,
      'Terrible': 1
    }
    this.props.sort(rating[e.target.innerText]);
  }

  render() {
    return (
      <div className={styles.main}>
        <ul className={styles.list}>
          <li className={styles.entry}><div onClick={(e) => this.handleClick(e)} className={styles.rating}>Excellent</div><span className={styles.bar}><span style={{width: `${this.props.percentage[5]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[5]}</span></li>
          <li className={styles.entry}><div onClick={(e) => this.handleClick(e)} className={styles.rating}>Very good</div><span className={styles.bar}><span style={{width: `${this.props.percentage[4]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[4]}</span></li>
          <li className={styles.entry}><div onClick={(e) => this.handleClick(e)} className={styles.rating}>Average</div><span className={styles.bar}><span style={{width: `${this.props.percentage[3]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[3]}</span></li>
          <li className={styles.entry}><div onClick={(e) => this.handleClick(e)} className={styles.rating}>Poor</div><span className={styles.bar}><span style={{width: `${this.props.percentage[2]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[2]}</span></li>
          <li className={styles.entry}><div onClick={(e) => this.handleClick(e)} className={styles.rating}>Terrible</div><span className={styles.bar}><span style={{width: `${this.props.percentage[1]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[1]}</span></li>
        </ul>
      </div>
    )
  }
}

export default Graph;