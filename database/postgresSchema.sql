DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    location TEXT,
    image TEXT,
    userThumbs INTEGER,
    userReviews INTEGER
);

CREATE TABLE reviews(
    id SERIAL,
    userId INTEGER REFERENCES users (id),
    listingId INTEGER,
    rating INTEGER,
    date TEXT,
    latest INTEGER,
    howRecent TEXT,
    reviewHeadline TEXT,
    comment TEXT
);

/*
psql -U jqywang -d reviews -a -f postgresSchema.sql
*/
