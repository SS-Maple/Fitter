const express = require('express');

let app = express();
let port = 3000;

const db = require('../database/connect.js');

app.use(express.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/user', (req, res) => {
  let userId = 1;
  db.client.query(`
    SELECT * FROM users
    WHERE id = ${userId}
  `, (err, data) => {
    if (err) {
      // console.log('error from server -', err)
      res.send(err);
    } else {
      // console.log('rows from server /users - ', data.rows)
      res.send(data.rows);
    }
  })
});

app.get('/friends', (req, res) => {
  let friendId = 1;
  db.client.query(`
    SELECT * FROM friends
    JOIN users
    ON friends.friendid = users.id
    WHERE userid = ${friendId}
    ORDER BY users.firstname
  `, (err, data) => {
    if (err) {
      // console.log('error from server -', err)
      res.send(err);
    } else {
      // console.log('rows from server /friends - ', data.rows)
      res.send(data.rows);
    }
  })
});

app.get('/userdata', (req, res) => {
  //test id
  let userId = 5;
  return db.client.query(`
  SELECT array_agg(row_to_json(a))
  FROM (
    SELECT id,
    firstName,
    lastName,
    email,
    descriptionmessage AS intro,
    picture,
    (SELECT array_to_json(array_agg(row_to_json(b)))
    FROM (
      SELECT id,
      to_char(timestamp, 'Month DD, YYYY') AS date,
      water,
      calories,
      weight
      FROM dailyData WHERE userId=users.id)b) AS stats,
    (SELECT row_to_json(c)
    FROM (
      SELECT id,
      watergoal,
      weightgoal,
      caloriegoal
      FROM goals WHERE userId=users.id)c) AS goals
    FROM users WHERE id=${userId})a;
  `)
  .then(results => res.send(results.rows[0].array_agg))
  .catch(err => console.error(err))
})


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});