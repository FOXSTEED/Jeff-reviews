const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const routes = require('./routes.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews');

app.use(cors());

app.use('/', express.static(path.join(__dirname, '..', 'src/client/public')));

app.use('/listings/:id', express.static(path.join(__dirname, '..', 'src/client/public')));

app.use('/listings', routes);

app.listen(3001, () => console.log('Server running! Listening on port 3001!'));
