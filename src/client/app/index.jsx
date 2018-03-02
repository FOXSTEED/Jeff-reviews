import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewList from './components/ReviewList.jsx';
import styles from './components/styling/app.css';
import Graph from './components/Graph.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      distribution: {},
      percentage: {}
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
        context.getDistribution(data);
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

  render () {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.title}>Reviews</span>
          <span className={styles.counter}>{`(${this.state.reviews.length})`}</span>
          <a href='#'><button className={styles.button}>Write a Review</button></a>
        </div>
        <div>
          <Graph rating={this.state.distribution} percentage={this.state.percentage} sort={this.sortByRating.bind(this)}/>
        </div>
        <div>
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));

