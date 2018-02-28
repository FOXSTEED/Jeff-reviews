const faker = require('faker');
const db = require('./index.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews');

let getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let createLocation = () => {
  let results = {};
  for (let i = 0; i < 200; i++) {
    results[i] = faker.address.city();
  }
  return results;
}

const listing = createLocation();
const howRecent = {
  0: 'today',
  1: 'yesterday',
  2: '2 days ago',
  3: '3 days ago',
  4: '4 days ago',
  5: '5 days ago',
  6: '6 days ago',
  7: '1 week ago',
  8: '2 weeks ago',
  9: '3 weeks ago',
  10: '1 month ago',
  11: '2 months ago',
  12: '3 months ago',
  13: '4 months ago',
  14: '5 months ago',
  15: '6 months ago'
}

let makeData = (num) => {
  let ratingGen = getRandom(1, 5);
  let listingGen = getRandom(0, 199);
  let ranThumb = getRandom(1, 50)
  let ranReview = getRandom(1, 100);
  let recent = getRandom(0, 15);

  let review = {
    listingId: listingGen,
    location: listing[listingGen],
    reviewId: num,
    rating: ratingGen,
    date: faker.date.past(),
    latest: recent,
    howRecent: howRecent[recent],
    reviewHeadline: faker.lorem.sentence(),
    comment: faker.lorem.paragraphs(),
    userName: faker.internet.userName(),
    userLocation: faker.address.city(),
    userImage: faker.image.avatar(),
    userThumbs: ranThumb,
    userReviews: ranReview,
  }
  return review;
}

let allData = () => {
  let output = [];
  for (let i = 0; i < 1600; i++) {
    output.push(makeData(i));
  }
  return output;
}

let data = allData();
db.save(data);
