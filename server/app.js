const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes.js');

app.use(express.static(path.join(__dirname, '..', 'src/client/public')));

app.use('/listings', routes);

app.listen(9000, () => console.log('Server running! Listening on port 9000!'));