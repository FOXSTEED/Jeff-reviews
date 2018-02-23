const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews');

const db = mongoose.connection;
db.once('open', function() {
  console.log('DB is running!');
});