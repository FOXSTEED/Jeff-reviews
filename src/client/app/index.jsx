import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList.jsx';
import Search from './components/Search.jsx';
import styles from './components/styling/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      topWords: []
    };
    this.fetch();
  }

  fetch() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/listings/134/reviews',
      success: function(data) {
        console.log('success', data);
        context.setState({'reviews': data});
        let words = context.getWords(data);
        context.setState({'topWords': words});
      },
      error: function(err) {
        console.log('error');
      }
    })
  }

  getWords(arr) {
    console.log('RANNNN');
    let wordsArr = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].comment.split(' ').forEach(word => wordsArr.push(word));
      console.log(wordsArr);
    }
    let wordsObj = wordsArr.reduce((acc, value) => {
      if (acc[value]) {
        acc[value]++;
      } else {
        acc[value] = 1;
      }
      return acc;
    }, {});
    let topWords = [];
    for (let key in wordsObj) {
      if (wordsObj[key] > 4 && key.length > 3) {
        topWords.push(key);
      }
    }
    return topWords;
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.title}>Reviews</span>
          <span className={styles.counter}>{`(${this.state.reviews.length})`}</span>
          <a href='#'><button className={styles.button}>Write a Review</button></a>
        </div>
        <div className={styles.header}>
          <Search words={this.state.topWords} numRev={this.state.reviews.length}/>
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

