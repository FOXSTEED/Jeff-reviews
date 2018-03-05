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
    let word = e.currentTarget.textContent;
    this.props.filter(word);
  }

  handleChange(e) {
    this.setState({search: e.target.value});
  }

  submit() {
    this.props.filter(this.state.search);
    this.setState({search: ''});
  }

  enter(e) {
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  render() {
    return (
      <div>
        <p className={styles.header}>Show reviews that mention</p>
        <div className={styles.search}>
          <span onClick={() => this.submit()} className={styles.icon}><i class="fas fa-search"></i></span><input value={this.state.search} onKeyPress={(e) => this.enter(e)} onChange={(e) => this.handleChange(e)}placeholder={this.state.placeholder} className={styles.input}></input>
        </div>
        <button onClick={() => this.props.reset()} className={styles.buttons}>All reviews</button>
        {this.props.words.map(word => <Word word={word} handleClick={this.handleClick.bind(this)}/>)}
        <p className={styles.nums}>{this.props.numRev ? `1 - ${this.props.numRev} reviews` : `0 reviews`}</p>
      </div>
    )
  }
}

export default Search;