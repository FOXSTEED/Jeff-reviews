import React from 'react';
import Word from './Word.jsx';
import styles from './styling/SearchWords.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: 'Search reviews',
      search: ''
    }
  }

  handleClick(e) {
    console.log('clickeddd');
    let word = e.currentTarget.textContent;
    this.props.filter(word);
  }

  render() {
    return (
      <div>
        <p className={styles.header}>Show reviews that mention</p>
        <div className={styles.search}>
          <span className={styles.icon}><i class="fas fa-search"></i></span><input placeholder={this.state.placeholder} className={styles.input}></input>
        </div>
        <div onClick={() => this.props.reset()} className={styles.buttons}>All reviews</div>
        {this.props.words.map(word => <Word word={word} handleClick={this.handleClick.bind(this)}/>)}
        <p className={styles.nums}>{`1 - ${this.props.numRev} reviews`}</p>
      </div>
    )
  }
}

export default Search;