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
      console.log('error from server -', err)
      res.send(err);
    } else {
      console.log('rows from server /users - ', data.rows)
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
      console.log('rows from server /friends - ', data.rows)
      res.send(data.rows);
    }
  })
});



app.listen(port, function() {
  console.log(`listening on port ${port}`);
});