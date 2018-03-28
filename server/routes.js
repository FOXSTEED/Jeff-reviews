const express = require('express');
const db = require('../database/index.js');
const redis = require('redis');
const router = express.Router();

// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient(REDIS_PORT);

router.get('/:id', (req, res) => {
  let listing = parseInt(req.params.id);
  //client.get(listing, (err, data) => {
    // if(err) {
    //   throw err;
    //   res.status(404).end();
    // }
    // if(data !== null) {
    //   res.status(200).send(JSON.parse(data));
    // } else {
      if(isNaN(listing)) {
        res.statusCode = 404;
        res.send('404 error, we do not have that URL for you' );
      } else {
        db.Review.find({listingId: listing}, {_id: 0}, (err, data) => {
          if(err) {
            res.end();
            throw err;
          }
          else {
          //  client.setex(listing, 1800, JSON.stringify(data));
            res.send(data);
          }
        })
      }
   // }
 // });
});

module.exports = router;
