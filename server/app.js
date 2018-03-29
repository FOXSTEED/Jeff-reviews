require('newrelic');
const Promise =require('bluebird');
const express = require('express');
const path = require('path');
const db = require('../database/index');
const port = process.env.REVIEWPORT || 3001;
const app = express();
const mongoose = require('mongoose');
const mongooseOptions = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 20, // Maintain up to 10 socket connections
  bufferMaxEntries: 0
};

// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient(REDIS_PORT);
// const cache = (req, res, next) => {
//   const listing = req.params.id;
//   client.get(listing, function (err, data) {
//     if (err) throw err;
//     console.log(data);
//     if (data !== null) {
//       res.send(data);
//     } else {
//       next();
//     }
//   });
// };

app.use('/bundledata', express.static(path.join(__dirname, '..', 'src/client/public/')));

app.use('/reviews', require('./routes.js'));
mongoose.connect('mongodb://localhost:27017/reviews', mongooseOptions)
  .then( () => {
      app.listen(port, () => console.log(`Server running! Mongoose Listening on port ${port}!`));
    })
  .catch(e => {throw err;});

