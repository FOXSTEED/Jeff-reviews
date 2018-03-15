const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/reviews');

const reviewSchema = mongoose.Schema({
  listingId: Number,
  location: String,
  reviewId: Number,
  date: String,
  latest: Number,
  howRecent: String,
  rating: Number,
  reviewHeadline: String,
  comment: String,
  userName: String,
  userLocation: String,
  userImage: String,
  userThumbs: Number,
  userReviews: Number,
});

const Review = mongoose.model('Review', reviewSchema);

const save = async function (reviewArr) {
  await Review.insertMany(reviewArr);
  console.log('saved');
};

const find = (listing, callback) => {
  let listingNum = parseInt(listing);
 Review.find({listingId: listingNum}, (err, data) => {
   if (err) {
     console.log(err);
   } else {
     callback(data);
   }
 });
};

module.exports.save = save;
module.exports.find = find;
module.exports.Review = Review;
