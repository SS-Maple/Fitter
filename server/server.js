const express = require('express');

let app = express();
let port = 3000;

const db = require('../database/connect.js');

app.use(express.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/notifications', (req, res) => {
  let userId = 1;
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
  })
});

app.post('/notifications', (req, res) => {
  let { userId, notificationsText, notificationsTimestamp } = req.query;
  db.client.query(`
    INSERT INTO notifications(userId,notificationsText,notificationsTimestamp)
    VALUES(${userId},${notificationsText},${notificationsTimestamp})
  `, (err, data) => {
    if (err) {
      throw new Error;
      res.send(err);
    } else {
      res.send(data);
    }
  })

});

app.put('/notifications', (req, res) => {
  let userId = 1;
  db.client.query(`
    DELETE FROM notifications
    WHERE userId = $(userId);
  `, (err, data) => {
    if (err) {
      throw new Error(err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});