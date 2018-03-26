/* eslint-disable react/prop-types */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList';
import Search from './components/Search';
import TryAgain from './components/TryAgain';
import styles from './components/styling/app.css';
import Graph from './components/Graph';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      copied: [],
      topWords: [],
      graphInfo: [],
    };
    this.handleRating = this.handleRating.bind(this);
    this.reset = this.reset.bind(this);
    this.filterByWord = this.filterByWord.bind(this);
  }

  componentDidMount() {
    const listingId = this.props.id;
    this.fetch(listingId);
  }

  getWords(arr) {
    const wordsArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      arr[i].comment.split(' ').forEach(word => wordsArr.push(word));
    }
    const wordsObj = wordsArr.reduce((acc, value) => {
      if (acc[value]) {
        acc[value] += 1;
      } else {
        acc[value] = 1;
      }
      return acc;
    }, {});
    const topWords = [];
    for (let key in wordsObj) {
      if (wordsObj.hasOwnProperty(key)) {
        if (wordsObj[key] > 4 && key.length > 3) {
          topWords.push(key);
        }
      }
    }
    this.setState({ topWords });
  }

  getDistribution(arr) {
    const base = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    const distro = arr.reduce((acc, value) => {
      if (acc[value.rating]) {
        acc[value.rating] += 1;
      } else {
        acc[value.rating] = 1;
      }
      return acc;
    }, base);
    this.getPercentage(distro);
  }

  getPercentage(obj) {
    const numReviews = Object.values(obj).reduce((acc, value) => acc + value);
    const percent = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        percent[key] = Math.trunc(obj[key] / numReviews * 100);
      }
    }
    this.generateGraphData(obj, percent);
  }

  sortByRating(num) {
    const filtered = [];
    const current = this.state.copied;
    for (let i = 0; i < current.length; i += 1) {
      if (current[i].rating === num) {
        filtered.push(current[i]);
      }
    }
    this.setState({ reviews: filtered });
  }

  handleRating(e) {
    const rating = {
      Excellent: 5,
      'Very good': 4,
      Average: 3,
      Poor: 2,
      Terrible: 1,
    };
    this.sortByRating(rating[e.target.innerText]);
  }

  generateGraphData(count, percents) {
    const rating = {
      5: 'Excellent',
      4: 'Very good',
      3: 'Average',
      2: 'Poor',
      1: 'Terrible',
    };
    const info = [];
    for (const key in count) {
      if (count.hasOwnProperty(key)) {
        info.unshift({ rating: rating[key], count: count[key], percentage: percents[key], rank: key });
      }
    }
    this.setState({ graphInfo: info });
  }

  reset() {
    const copy = this.state.copied;
    this.setState({ reviews: copy });
  }

  filterByWord(word) {
    const filtered = [];
    const current = this.state.copied;
    for (let i = 0; i < current.length; i += 1) {
      if (current[i].comment.includes(word)) {
        filtered.push(current[i]);
      }
    }
    this.setState({ reviews: filtered });
  }

  fetch(id) {
    const context = this;
    $.ajax({
      type: 'GET',
      url: `http://localhost:3001/reviews/${id}`,
      success: function success(data) {
        context.getDistribution(data);
        context.setState({ reviews: data });
        context.setState({ copied: data });
        context.getWords(data);
      },
      error: function error(err) {
        console.log('error', err);
      },
    });
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.titleHeader}>
          <span className={styles.title}>Reviews</span>
          <span className={styles.counter}>{`(${this.state.reviews.length})`}</span>
          <button className={styles.button}>Write a Review</button>
        </div>
        <div className={styles.graph}>
          <Graph graphInfo={this.state.graphInfo} handleRating={this.handleRating} />
        </div>
        <div className={styles.header}>
          <Search words={this.state.topWords} reset={this.reset} numRev={this.state.reviews.length} filter={this.filterByWord} />
        </div>
        <div>
          {this.state.reviews.length ? <ReviewList reviews={this.state.reviews} /> : <TryAgain reset={this.reset} />}
        </div>
      </div>
    );
  }
}

module = Reviews;

