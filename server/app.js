const express = require('express');
const path = require('path');
const app = express();
const dataGen = require('../database/seedData.js');

console.log('what', dataGen);

app.use(express.static(path.join(__dirname, '..', 'src/client/public')));

app.listen(9000, () => console.log('Server running! Listening on port 9000!'));