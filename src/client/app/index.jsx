import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList.jsx';
import Search from './components/Search.jsx';
import TryAgain from './components/TryAgain.jsx';
import styles from './components/styling/app.css';
import Graph from './components/Graph.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      copied: [],
      topWords: [],
      graphInfo: [],
    };
  }

  componentDidMount() {
    //const local = Number(window.location.pathname.split('/')[2]);
    const id = this.props.id;
    this.fetch(id);
  }

  fetch(id) {
    let context = this;
    $.ajax({
      type: 'GET',
      url: `http://localhost:3001/listings/${id}/reviews`,
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
    const rating = {
      5: 'Excellent',
      4: 'Very good',
      3: 'Average',
      2: 'Poor',
      1: 'Terrible',
    };
    const info = [];
    for (const key in count) {
      info.unshift({rating: rating[key], count: count[key], percentage: percents[key], rank: key});
    }
    this.setState({ graphInfo: info });
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
      percent[key] = Math.trunc(obj[key] / numReviews * 100);
    }
    this.generateGraphData(obj, percent);
  }

  reset() {
    const copied = this.state.copied;
    this.setState({ reviews: copied });
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
      if (wordsObj[key] > 4 && key.length > 3) {
        topWords.push(key);
      }
    }
    this.setState({ topWords: topWords });
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
    );
  }
}

ReactDOM.render(<Reviews />, document.getElementById('app'));

window.Reviews = Reviews;
export default Reviews;

