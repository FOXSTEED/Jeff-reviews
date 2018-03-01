const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews');

let reviewSchema = mongoose.Schema({
  listingId: Number,
  location: String,
  reviewId: {type: Number, unique: true},
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
  userReviews: Number
});

let Review = mongoose.model('Review', reviewSchema);

let save = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let entry = arr[i];
    let toSave = new Review(entry);
    toSave.save();
  }
}

let find = (listing, callback) => {
  Review.find(function(err, reviews) {
    if (err) {
      return console.error(err);
    } else {
      callback(reviews);
    }
  }).where('listingId').equals(listing).sort({latest: 1});
}


module.exports.save = save;
module.exports.find = find;
module.exports.Review = Review;