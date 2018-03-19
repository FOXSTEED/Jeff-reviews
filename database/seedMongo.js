const MongoClient = require('mongodb').MongoClient;

const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
}; 

const makeBadData = (i) => {
  let data = {
    listingId: getRandom(1, 10000000),
    location: 'Your moms house',
    reviewId: i,
    date: '12/22/13',
    latest: 12,
    howRecent: '2 months ago',
    rating: 4,
    reviewHeadline: 'I liked this hotel a lot, I would give a 4/5, or a 5/7',
    comment: 'I was down with the wait staff, but like maybe dont take itself as seriously? The food was good, I like SF, but dang man its hard to get around.',
    userName: 'jqywang',
    userLocation: 'san francisco',
    userImage: 'https://imgur.com/PbjIC',
    userThumbs: '23',
    userReviews: '33',
  }
  return data;
}
let time = new Date().getTime();
let total = 30000000;
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
        insert();
      } else {
        console.log('done in', (new Date().getTime() - time)/1000);
        client.close();
      }
    }
    insert();
  })
  .catch(e => {
    console.log(e);
  })
}
seedDB();