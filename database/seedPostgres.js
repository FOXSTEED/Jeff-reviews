const faker = require('faker');
const pgp = require('pg-promise')({
   capSQL: true // generate capitalized SQL 
});
const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
};
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'reviews',
  user: 'jqywang',
  password: '123'
};

const db = pgp(cn);
// let userData = ['jeff', 'sf', 'imageurl', '3', '4'];
// let userQuery = "INSERT INTO users(username, location, image, userThumbs, userReviews) VALUES($1, $2, $3, $4, $5)"
const csUser = new pgp.helpers.ColumnSet([
  'username',
  'location',
  'image',
  'userthumbs',
  'userreviews'
], {table: 'users'});
const csReview = new pgp.helpers.ColumnSet([
  'userid',
  'listingid',
  'rating',
  'date',
  'latest',
  'howrecent',
  'reviewheadline',
  'comment'
], {table: 'reviews'});

//const insert = pgp.helpers.insert([generateUser(), generateUser()], csUser);


const generateUser = () => {
  return {
    username: faker.internet.userName(),
    location: 'San Francisco',
    image: 'image.img',
    userthumbs: getRandom(1,50),
    userreviews: '33'
  };
}
const generateReview = () => {
  return {
    userid: getRandom(1, 1000000),
    listingid: getRandom(1, 1250000),
    rating: 4,
    date: '12/12/12',
    latest: 3,
    howrecent: 'last week',
    reviewheadline: 'I went to this place',
    comment: "I liked it. They had nice things. The trip was a 4/5."
  };
}

const getNextDataUser = (t, index) => {
  let data = null;
  if(index < 1000) {
    data = new Array(1000);
    for(let i = 0; i < 1000; i++) {
      data[i] = generateUser();
    }
  }
  // console.log(data);
  return Promise.resolve(data);
}
const getNextDataReview = (t, index) => { 
  let data = null;
  if(index < 2000) {
    data = new Array(5000);
    for(let i = 0; i < 5000; i++) {
      data[i] = generateReview();
    }
  }
  // console.log(data);
  return Promise.resolve(data);
}



db.tx('user-transaction', t => {
  return t.sequence(index => {
    return getNextDataUser (t, index)
      .then(data => {
        if (data) {
          const insert = pgp.helpers.insert(data, csUser);
          // console.log(insert);
          return t.none(insert);
        }
      })
      .catch(e => {
        console.log(e);
      })
  });
})
  .then(data => {
    console.log(data);
    console.log('we made it bois (user)');
    db.tx('review-transaction', t => {
      return t.sequence(index => {
        return getNextDataReview(t, index)
        .then(data => {
          if(data) {
            const insertReview = pgp.helpers.insert(data, csReview);
            return t.none(insertReview);
          }
        });
      });
    })
    .then(data => {
      console.log(data);
      console.log('we did it bois (review)');
    })
    .catch(e => {
      console.log(e);
    });
  })
  .catch(e => {
    throw e;
  });
// console.log(insert);
// db.none(insert)
//   .then(() => {
//     console.log('success');
//   })
//   .catch(e => {
//     console.log(e);
//   });
