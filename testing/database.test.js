const { Review } = require('../database/index.js');

describe('Checking database', () => {
  test('Should retrieve 1600 reviews from database', () => {
     Review.find((err, reviews) => {
      if (err) {
        console.error(err);
      }
      expect(reviews.length).toEqual(1600);
    });
  });

  test('Covers atleast 90% of listings with a review', () => {
    Review.find((err, reviews) => {
      if (err) {
        console.error(err);
      }
      let listings = {};
      reviews.forEach(review => {
        listings[review.listingId] = true;
      });
      expect(Object.keys(listings).length).toBeGreaterThan(180);
    });
  });
});
