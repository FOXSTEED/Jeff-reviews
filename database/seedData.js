const faker = require('faker');

let makeData = (num) => {
  let ratingGen = Math.floor(Math.random() * 5) + 1;
  let listingGen = Math.floor(Math.random() * 200);
  let review = {
    listingId: listingGen,
    reviewId: num,
    rating: ratingGen,
    date: faker.date.past(),
    reviewHeadline: faker.lorem.sentence(),
    comment: faker.lorem.paragraphs(),
    userName: faker.internet.userName(),
    userLocation: faker.address.city(),
    userImage: faker.image.avatar()
  }
  return review;
}

let allData = () => {
  let output = [];
  for (let i = 0; i < 1000; i++) {
    output.push(makeData(i));
  }
  return output;
}

module.exports.makeData = makeData;
module.exports.allData = allData;