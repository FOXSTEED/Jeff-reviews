const faker = require('faker');
const db = require('./index.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews');

let createLocation = () => {
  let results = {};
  for (let i = 0; i < 200; i++) {
    results[i] = faker.address.city();
  }
  return results;
}

const listing = createLocation();

let makeData = (num) => {
  let ratingGen = Math.floor(Math.random() * 5) + 1;
  let listingGen = Math.floor(Math.random() * 200);
  let ranThumb = Math.floor(Math.random() * 51) + 1;
  let ranReview = Math.floor(Math.random() * 101) + 1;

  let review = {
    listingId: listingGen,
    location: listing[listingGen],
    reviewId: num,
    rating: ratingGen,
    date: faker.date.past(),
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
