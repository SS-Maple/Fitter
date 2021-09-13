const express = require('express');

let app = express();
let port = 3000;

const db = require('../database/connect.js');

app.use(express.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));

/* NOTIFICATIONS ROUTES */

app.get('/notifications', (req, res) => {
  let { userId } = req.query;
  console.log('userID: ', userId);
  db.client.query(`
    SELECT * FROM notifications
    WHERE userId = ${userId}
  `, (err, data) => {
    if (err) {
      throw new Error(err);
      res.send(err);
    } else {
      console.log('data from get query\n', data);
      res.send(data);
    }
  });
});

app.put('/notifications', (req, res) => {
  let { userId } = req.query;
  db.client.query(`
    UPDATE notifications
    SET new = false
    WHERE userId = ${userId}
  `, (err, data) => {
    if (err) {
      throw new Error(err);
      res.send(err);
    } else {
      res.send('Ok');
    }
  });
});

app.post('/notifications', (req, res) => {
  let { userId, notificationsText, notificationsTimestamp } = req.query;
  db.client.query(`
    INSERT INTO notifications(userId,notificationsText,notificationsTimestamp,new)
    VALUES(${userId},${notificationsText},${notificationsTimestamp},true)
  `, (err, data) => {
    if (err) {
      throw new Error;
      res.send(err);
    } else {
      res.send('Ok');
    }
  })

});

app.delete('/notifications', (req, res) => {
  let userId = 1;
  db.client.query(`
    DELETE FROM notifications
    WHERE userId = ${userId};
  `, (err, data) => {
    if (err) {
      throw new Error(err);
      res.send(err);
    } else {
      res.send('Ok');
    }
  });
});

/* END NOTIFICATIONS ROUTES */
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


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});