const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/reviews');

app.use(cors());

app.use('/:id', express.static(path.join(__dirname, '..', 'src/client/public')));

app.use('/reviews/bundle.js', express.static(path.join(__dirname, '..', 'src/client/public/bundle.js')));

app.use('/reviews/:id', (req, res) => {
  let listing = req.params.id;
  db.find(listing, (data) => {
    res.send(data);
  });
});

app.listen(3001, () => console.log('Server running! Listening on port 3001!'));
