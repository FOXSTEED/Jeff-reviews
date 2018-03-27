require('newrelic');
const MongoClient = require('mongodb').MongoClient;
const Promise =require('bluebird');
const express = require('express');
const path = require('path');
const cors = require('cors');
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
app.use(cors());

app.use('/', express.static(path.join(__dirname, '..', 'src/client/public/')));

app.use('/reviews', require('./routes.js'));
mongoose.connect('mongodb://localhost:27017/reviews', mongooseOptions)
  .then( () => {
      app.listen(port, () => console.log(`Server running! Mongoose Listening on port ${port}!`));
    })
  .catch(e => {throw err;});
// MongoClient.connect('mongodb://localhost:27017/reviews', { promiseLibrary: Promise , poolSize: 15})
//   .then(client => {
//     app.locals.db=client.db('reviews');
//     app.listen(port, () => console.log(`Server running! Listening on port ${port}!`));
//   })
//   .catch(err => console.log(err.stack));
