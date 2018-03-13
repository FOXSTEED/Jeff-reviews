const { Review } = require('../database/index.js');

describe('Checking database', () => {
  test('Should retrieve 1600 reviews from database', () => {
     Review.find((err, reviews) => {
      if (err) {
        return console.error(err);
      }
      return expect(reviews.length).toEqual(1600);
    });
  });

  test('Covers atleast 90% of listings with a review', () => {
    Review.find((err, reviews) => {
      if (err) {
        return console.error(err);
      }
      const listings = {};
      reviews.forEach(review => {
        listings[review.listingId] = true;
      });
      return expect(Object.keys(listings).length).toBeGreaterThan(180);
    });
  });
});
