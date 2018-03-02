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
      copied: [],
      topWords: [],
      graphInfo: []
    };
    this.fetch();
  }

  fetch() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/listings/134/reviews',
      success: function(data) {
        context.getDistribution(data);
        context.setState({reviews: data});
        context.setState({copied: data});
        context.getWords(data);
      },
      error: function(err) {
        console.log('error');
      }
    })
  }

  generateGraphData(count, percents) {
    let rating = {
      5: 'Excellent',
      4: 'Very good',
      3: 'Average',
      2: 'Poor',
      1: 'Terrible'
    }
    let info = [];
    for (let key in count) {
      info.unshift({rating: rating[key], count: count[key], percentage: percents[key], rank: key});
    }
    this.setState({graphInfo: info});
  }

  handleRating(e) {
    let rating = {
      'Excellent': 5,
      'Very good': 4,
      'Average': 3,
      'Poor': 2,
      'Terrible': 1
    }
    this.sortByRating(rating[e.target.innerText]);
  }

  sortByRating(num) {
    let filtered = [];
    let current = this.state.copied;
    for (let i = 0; i < current.length; i++) {
      if (current[i].rating === num) {
        filtered.push(current[i]);
      }
    }
    this.setState({reviews: filtered})
  }

  getDistribution(arr) {
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
    this.getPercentage(distro);
  }

  getPercentage(obj) {
    let numReviews = Object.values(obj).reduce((acc, value) => acc + value);
    let percent = {}
    for (let key in obj) {
      percent[key] = Math.trunc(obj[key] / numReviews * 100);
    }
    this.generateGraphData(obj, percent);
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
    this.setState({topWords: topWords});
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.titleHeader}>
          <span className={styles.title}>Reviews</span>
          <span className={styles.counter}>{`(${this.state.reviews.length})`}</span>
          <a href='#'><button className={styles.button}>Write a Review</button></a>
        </div>
        <div className={styles.graph}>
          <Graph graphInfo={this.state.graphInfo} handleRating={this.handleRating.bind(this)}/>
        </div>
        <div className={styles.header}>
          <Search words={this.state.topWords} reset={this.reset.bind(this)} numRev={this.state.reviews.length} filter={this.filterByWord.bind(this)}/>
        </div>
        <div>
          {this.state.reviews.length ? <ReviewList reviews={this.state.reviews} /> : <TryAgain reset={this.reset.bind(this)}/>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

