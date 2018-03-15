const faker = require('faker');

const db = require('./index.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/reviews');

const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
};

const createLocation = () => {
  const results = {};
  for (let i = 0; i < 200; i += 1) {
    results[i] = faker.address.city();
  }
  return results;
};

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
  15: '6 months ago',
};

const makeData = (num) => {
  const ratingGen = getRandom(1, 5);
  const listingGen = getRandom(0, 125);
  const ranThumb = getRandom(1, 50);
  const ranReview = getRandom(1, 100);
  const recent = getRandom(0, 15);

  const review = {
    listingId: listingGen,
    location: listing[listingGen],
    reviewId: num,
    rating: ratingGen,
    date: faker.date.past(),
    latest: recent,
    howRecent: howRecent[recent],
    reviewHeadline: faker.lorem.sentence(),
    comment: (faker.lorem.sentence() + faker.lorem.sentence()),
    userName: faker.internet.userName(),
    userLocation: faker.address.city(),
    userImage: faker.image.avatar(),
    userThumbs: ranThumb,
    userReviews: ranReview,
  };
  return review;
};
const makeBadData = (i) => {
  const data = {
    listingId: getRandom(1,12500),
    location: 'Your moms house',
    reviewId: i,
    date: '12/22/13',
    latest: 12,
    howRecent: howRecent[12],
    rating: 4,
    reviewHeadline: 'I got some stuff I just want my data to insert',
    comment: ' sometihgan aaiasdf please work lmao :) hehehe',
    userName: 'jqywang',
    userLocation: 'san francisco',
    userImage: 'https://imgur.com/PbjIC',
    userThumbs: '23',
    userReviews: '33',
  }
  return data;
}

let allData = async function(range, increment) {
  let reviews = [];
  for(var i = range; i < range+increment; i++) {
    reviews.push(makeBadData(i));
  }
  await db.save(reviews);
  console.log('after for loop');
};

async function iterateOverStuff(){ 
  console.time();
  let total = 10000000;
  let bigRange = 100000;

  for(let x = 0; x < total; x+= bigRange) {
    await allData(x, bigRange);
    console.log(x);
  }
  console.timeEnd();
}
iterateOverStuff();

