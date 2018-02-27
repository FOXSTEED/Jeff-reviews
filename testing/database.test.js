const query = require('../database/index.js');

describe('Checking database', () => {
  test('Should retrieve 1000 reviews from database', () => {
    query.review.find((err, reviews) => {
      if (err) {
        console.error(err);
      }
      expect(reviews.length).toBe(1000);
    });
  });

  test('Every listing has atleast 1 review', () => {
    query.review.find((err, reviews) => {
      if (err) {
        console.error(err);
      }
      let listings = [];
      reviews.forEach(review => listings.push(review.listingId));
      expect(listings.length).toBe(200);
    });
  });
});
