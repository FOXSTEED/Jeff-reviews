const fs = require('fs');
const pgp = require('pg-promise')({
  capSQL: true
});
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'reviews',
  user: 'jqywang',
  password: '123'
};
const db = pgp(cn);

const getRandom = (min, max) => {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * ((b - a) + 1)) + a;
}; 

let benchmark = async () => { 
  let timeArray = [];
  let writeString = 'PostgresData,\n';
  for(let i = 0; i < 10000; i++) {
    let time = Date.now();
    await db.any('SELECT * FROM reviewtable INNER JOIN  usertable ON reviewtable.userid = usertable.userid WHERE reviewtable.listingid = $1;', getRandom(1,10000000));
    let totalTime = Date.now() - time;
    timeArray.push(totalTime);
    writeString+=`${totalTime},\n`;
  }
  fs.writeFile('postgresData.csv', writeString, (e) => {
    console.log(e);
  })
  let totalQueryTime = timeArray.reduce((a,b) => {return (a + b)});
  console.log('total query time is : ', totalQueryTime);
  console.log('average query time is : ', totalQueryTime/10000);
};
benchmark();