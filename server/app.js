const express = require('express');
const path = require('path');
const app = express();
const dataGen = require('../database/seedData.js');
const dataSave = require('../database/index.js');

let data = dataGen.allData();
dataSave.save(data)


app.use(express.static(path.join(__dirname, '..', 'src/client/public')));

app.listen(9000, () => console.log('Server running! Listening on port 9000!'));