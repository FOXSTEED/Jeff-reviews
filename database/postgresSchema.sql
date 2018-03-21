DROP TABLE IF EXISTS reviewtable;
DROP TABLE IF EXISTS usertable;
CREATE TABLE usertable (
    id SERIAL PRIMARY KEY,
    userid INTEGER,
    username TEXT,
    location TEXT,
    image TEXT,
    userThumbs INTEGER,
    userReviews INTEGER
);

CREATE UNIQUE INDEX userindex ON usertable (userid);

CREATE TABLE reviewtable(
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES usertable (userid),
    listingId INTEGER,
    rating INTEGER,
    date TEXT,
    latest INTEGER,
    howRecent TEXT,
    reviewHeadline TEXT,
    comment TEXT
);
CREATE INDEX listingindex ON reviewtable USING hash (listingid);

/*
psql -U jqywang -d reviews -a -f postgresSchema.sql
*/
/*
SELECT   *
FROM        reviewtable
INNER JOIN  usertable
    ON      reviewtable.userid = usertable.userid
WHERE reviewtable.listingid = 140;
*/

