DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS reviews
CREATE TABLE users (
    id SERIAL,
    username TEXT,
    location TEXT,
    image TEXT,
    userThumbs INTEGER,
    userReviews INTEGER
);

CREATE TABLE reviews(
    id SERIAL,
    userId INTEGER references users(id),
    listingId INTEGER,
    rating INTEGER,
    date TEXT,
    lastest INTEGER,
    howRecent TEXT,
    reviewHeadline TEXT,
    comment TEXT
);