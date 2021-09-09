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

app.get('/rankings', (req, res) => {
  let friendId = 1;
  // SELECT * FROM friends 
  // JOIN users
  // ON friends.friendid = users.id
  // JOIN goals
  // ON goals.userId = users.id
  // JOIN dailyData
  // ON dailyData.userId = users.id
  // WHERE friends.userID = 1


  // SELECT row_to_json(info) results
  // FROM (
  //   SELECT id, firstname, lastname, picture, (
  //       SELECT array_to_json(array_agg(row_to_json(row)))
  //       FROM (
  //         SELECT *
  //         FROM goals
  //         WHERE goals.userId = users.id
  //       ) row
  //     ) as goals
  //   FROM users
  //   WHERE id = 1
  // ) info

  
  db.client.query(`
  
  SELECT row_to_json(info) results
  FROM (
    SELECT id, firstname, lastname, picture, (
        SELECT array_to_json(array_agg(row_to_json(row)))
        FROM (
          SELECT *
          FROM friends
          WHERE friends.friendid = users.id
        ) row
      ) as friends,
      SELECT array_to_json(array_agg(row_to_json(row)))
        FROM (
          SELECT *
          FROM goals
          WHERE goals.userId = users.id
        ) rows
      ) as goals
    FROM users 
    WHERE users.id = 1
  ) info
  
  `, (err, data) => {
    if (err) {
      console.log('error from server -', err)
      res.send(err);
    } else {
      console.log('rows from server /rankings - ', data.rows)
      res.send(data.rows);
    }
  })
});


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});