import React from 'react';
import styles from './styling/Graph.css';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className={styles.main}>
        <ul className={styles.list}>
          <li className={styles.entry}><div className={styles.rating}>Excellent</div><span className={styles.bar}><span style={{width: `${this.props.percentage[5]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[5]}</span></li>
          <li className={styles.entry}><div className={styles.rating}>Very good</div><span className={styles.bar}><span style={{width: `${this.props.percentage[4]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[4]}</span></li>
          <li className={styles.entry}><div className={styles.rating}>Average</div><span className={styles.bar}><span style={{width: `${this.props.percentage[3]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[3]}</span></li>
          <li className={styles.entry}><div className={styles.rating}>Poor</div><span className={styles.bar}><span style={{width: `${this.props.percentage[2]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[2]}</span></li>
          <li className={styles.entry}><div className={styles.rating}>Terrible</div><span className={styles.bar}><span style={{width: `${this.props.percentage[1]}%`}} className={styles.innerBar}></span></span><span>{this.props.rating[1]}</span></li>
        </ul>
      </div>
    )
  }
}

export default Graph;