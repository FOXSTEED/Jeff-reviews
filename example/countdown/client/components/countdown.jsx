import React from 'react';

const countStyle = {
  borderStyle: 'solid',
  borderWidth: '1px'
};

export default class CountDown extends React.Component {
  constructor() {
    super();

    this.state = {
      time: {},
      seconds: 1860
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      'h': hours,
      'm': minutes,
      's': seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  render(){
    return (
      <div style={countStyle}>
        Time left: {this.state.time.m}m {this.state.time.s}s
      </div>
    )
  }
};