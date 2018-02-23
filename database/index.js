const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews');
const dataGen = require('./seedData.js');

const db = mongoose.connection;
db.once('open', function() {
  console.log('DB is running!');
});

let reviewSchema = mongoose.Schema({
  listingId: Number,
  reviewId: {type: Number, unique: true},
  date: String,
  rating: Number,
  reviewHeadline: String,
  comment: String,
  userName: String,
  userLocation: String,
  userImage: String
});

let Review = mongoose.model('Review', reviewSchema);

let save = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let entry = arr[i];
    let toSave = new Review({
      listingId: entry.listingId,
      reviewId: entry.reviewId,
      date: entry.date,
      rating: entry.rating,
      reviewHeadline: entry.reviewHeadline,
      comment: entry.comment,
      userName: entry.userName,
      userLocation: entry.userLocation,
      userImage: entry.userImage
    });
    toSave.save();
  }
}

module.exports.save = save;