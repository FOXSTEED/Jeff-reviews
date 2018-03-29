const MongoClient = require('mongodb').MongoClient;
const faker = require('faker');
const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
}; 

const avatar = faker.image.avatar();

const makeBadData = (i) => {
  let data = {
    listingId: getRandom(1, 10000000),
    location: 'San Francisco Marriot',
    reviewId: i,
    date: '12/22/13',
    latest: 12,
    howRecent: '2 months ago',
    rating: i%5 + 1,
    reviewHeadline: `I liked this hotel a lot, I would give a ${i%5 + 1}/5.`,
    comment: `I was down with the wait staff, but like maybe dont take itself as seriously? The food was good, I like SF, but dang man its hard to get around. They told me I was the ${i}th user.`,
    userName: 'randomUser',
    userLocation: 'San Francisco',
    userImage: avatar,
    userThumbs: '23',
    userReviews: '33',
  }
  return data;
}
let time = new Date().getTime();
let total = 20000000;
let size = 20000;
let batch = 0;

let seedDB = () => {
  MongoClient.connect('mongodb://localhost/').then(client => {
    const db = client.db('reviews');
    const collection = db.collection('reviews');
    async function insert() {
      let insertArray = new Array(size);
      for(let i = 1; i <= size; i++) {
        let data = makeBadData(i + batch * size);
        insertArray[i-1] = {insertOne: data}
      }
      await collection.bulkWrite(insertArray, {ordered: false});
      batch += 1;
      if(batch < total/size) {
        console.log('inserted batch: ', batch);
        insert();
      } else {
        await collection.createIndex({listingId: "hashed"});
        client.close();
        console.log('done in ', (new Date().getTime() - time)/60000, ' minutes');
      }
    }
    insert();
  })
  .catch(e => {
    console.log(e);
  })
}
seedDB();

module.exports.getRandom = getRandom;
module.exports.makeBadData = makeBadData;