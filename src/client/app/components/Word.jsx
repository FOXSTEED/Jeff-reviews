import React from 'react';
import styles from './styling/SearchWords.css';

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  tagged() {
    console.log('been tagged');
  }

  render() {
    return (
      <div onClick={(e) => this.props.handleClick(e)} className={styles.buttons}>{this.props.word}</div>
    )
  }
}

export default Word;