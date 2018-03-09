const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews');

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

const save = (arr) => {
  Review.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Dropped DB');
    }
  });

  const promises = [];
  for (let i = 0; i < arr.length; i += 1) {
    const entry = arr[i];
    const toSave = new Review(entry);
    promises.push(toSave.save());
  }
  Promise.all(promises).then(() => {
    console.log('All added into DB');
    process.exit();
  });
};

const find = (listing, callback) => {
  Review.find((err, reviews) => {
    if (err) {
      return console.error(err);
    }
    return callback(reviews);
  }).where('listingId').equals(listing).sort({ latest: 1 });
};

module.exports.save = save;
module.exports.find = find;
module.exports.Review = Review;
