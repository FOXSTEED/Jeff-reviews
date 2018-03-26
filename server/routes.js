const express = require('express');
const db = require('../database/index.js');

const router = express.Router();

// router.get('/:id', (req, res) => {
//   let listing = parseInt(req.params.id);
//   const db = req.app.locals.db;
//   let cursing = db.collection('reviews').find({ listingId: listing });
//   let dataArray = [];
//   cursing.on("data", (data) => {
//     dataArray.push(data);
//   });
//   cursing.on("end", (data) => {
//     res.send(dataArray);
//   })
// });


router.get('/:id', (req, res) => {
  let listing = parseInt(req.params.id);
  if(isNaN(listing)) {
    res.statusCode = 404;
    res.send('404 error, we do not have that URL for you' );
  } else {
    db.Review.find({listingId: listing}, (err, data) => {
      if(err) {
        res.end();
        throw err;
      }
      else {
        res.send(data);
      }
    })
  }
});

module.exports = router;
