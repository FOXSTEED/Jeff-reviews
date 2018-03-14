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

const makeData = (num, range) => {
  const ratingGen = getRandom(1, 5);
  const listingGen = getRandom(range, (range+1249));
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

const allData = (range) => {
  for (let i = range; i < (range+10); i++) {
    db.save(makeData(i, range));
  }
  console.log('DONE BABEY');
};

for(let x = 0; x < 100; x+= 10) {
  allData(x);
}

