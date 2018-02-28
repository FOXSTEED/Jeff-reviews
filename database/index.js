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
    let toSave = new Review({
      listingId: entry.listingId,
      location: entry.location,
      reviewId: entry.reviewId,
      date: entry.date,
      latest: entry.latest,
      howRecent: entry.howRecent,
      rating: entry.rating,
      reviewHeadline: entry.reviewHeadline,
      comment: entry.comment,
      userName: entry.userName,
      userLocation: entry.userLocation,
      userImage: entry.userImage,
      userThumbs: entry.userThumbs,
      userReviews: entry.userReviews
    });
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
  }).where('listingId').equals(listing);
}


module.exports.save = save;
module.exports.find = find;
module.exports.Review = Review;