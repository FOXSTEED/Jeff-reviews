import React from 'react';
import styles from './styling/SearchWords.css';

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  render() {
    return (
      <button onClick={(e) => this.props.handleClick(e)} className={styles.buttons}>{this.props.word}</button>
    )
  }
}

export default Word;