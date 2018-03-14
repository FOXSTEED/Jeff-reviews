const express = require('express');
const db = require('../database/index.js');

const router = express.Router();

router.get('/:listing_id/reviews', (req, res) => {
  let listing = req.params.listing_id;
  console.log(listing, 'listing here');
  db.find(listing, (data) => {
    res.send(data);
  });
});

module.exports = router;
