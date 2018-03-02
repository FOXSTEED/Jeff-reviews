import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList.jsx';
import Search from './components/Search.jsx';
import TryAgain from './components/TryAgain.jsx';
import styles from './components/styling/app.css';
import Graph from './components/Graph.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      distribution: {},
      percentage: {},
      copied: [],
      topWords: []
    };
    this.fetch();
  }

  fetch() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/listings/21/reviews',
      success: function(data) {
        console.log('success', data);
        context.setState({'reviews': data});
        context.getDistribution(data);
        context.setState({reviews: data});
        context.setState({copied: data});
        let words = context.getWords(data);
        context.setState({topWords: words});
      },
      error: function(err) {
        console.log('error');
      }
    })
  }
  
  sortByRating(num) {
    console.log('sortedbynum', num);
  }

  getDistribution(arr) {
    console.log('running')
    let base = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
    let distro = arr.reduce((acc, value) => {
      if (acc[value.rating]) {
        acc[value.rating]++;
      } else {
        acc[value.rating] = 1;
      }
      return acc;
    }, base);
    this.setState({distribution: distro});
    this.getPercentage(distro);
  }

  getPercentage(obj) {
    let numReviews = Object.values(obj).reduce((acc, value) => acc + value);
    let percent = {}
    for (let key in obj) {
      percent[key] = Math.trunc(obj[key] / numReviews * 100);
    }
    console.log(percent);
    this.setState({percentage: percent});
  }

  reset() {
    let copied = this.state.copied;
    this.setState({reviews: copied});
  }

  filterByWord(word) {
    let filtered = [];
    let current = this.state.copied;
    for (let i = 0; i < current.length; i++) {
      if (current[i].comment.includes(word)) {
        filtered.push(current[i]);
      }
    }
    this.setState({reviews: filtered})
  }

  getWords(arr) {
    let wordsArr = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].comment.split(' ').forEach(word => wordsArr.push(word));
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
          <Search words={this.state.topWords} reset={this.reset.bind(this)} numRev={this.state.reviews.length} filter={this.filterByWord.bind(this)}/>
        </div>
        <div>
          <Graph rating={this.state.distribution} percentage={this.state.percentage} sort={this.sortByRating.bind(this)}/>
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} />
          {this.state.reviews.length ? <ReviewList reviews={this.state.reviews} /> : <TryAgain reset={this.reset.bind(this)}/>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

