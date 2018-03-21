const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs = require('fs');
const helper = require('./index');

const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
}; 

let timeArray = [];
const review = helper.Review;
let writeString = `MongoTime,\n`;
let benchmarker = async (num) => {
  for(let i = 0; i < 10000; i++) {
    let timestart = Date.now();
    await review.find({listingId: num}, (err, data) => {
    });
    let totalTime =  Date.now() - timestart;
    timeArray.push(totalTime);
    writeString+= `${totalTime},\n`;
  }
  return writeString;
};
benchmarker().then((data) => {
  fs.writeFile('./data/mongoData.csv', data, (err)=> {
    console.log(err);
    let length = timeArray.length;
    let total = timeArray.reduce((a, b)=> {return (a+b)});
    console.log('average time: ',total/length);
  })
});

  

// console.log('start');
// findFunction({listingId: 1212})
//   .then(console.log(data));
// console.log('end');