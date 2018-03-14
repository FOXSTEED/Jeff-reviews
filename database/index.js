const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.connect('mongodb://database/reviews');

const reviewSchema = mongoose.Schema({
  listingId: Number,
  location: String,
  reviewId: { type: Number, unique: true },
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

const save = (oneReview, stringPassed) => {
  let toSave = new Review(oneReview);
  toSave.save((err) => {
    if(err){console.log(err);}
  });
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
