const express = require('express');

let app = express();
let port = 3000;

const db = require('../database/connect.js');

app.use(express.urlencoded());
app.use(express.static(__dirname + '/../client/dist'));


// get all user information
app.get('/users', (req, res) => {
  db.client.query(`
    SELECT * FROM users
    ORDER BY firstname
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

// get current user information
app.get('/user', (req, res) => {
  let userId = req.query.userId;
  db.client.query(`
    SELECT * FROM users
    WHERE id = ${userId}
  `, (err, data) => {
    if (err) {
      // console.log('error from server -', err)
      res.send(err);
    } else {
      // console.log('rows from server /user - ', data.rows)
      res.send(data.rows);
    }
  })
});

// get current user's friends
app.get('/friends', (req, res) => {
  let friendId = req.query.userId;
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
// get home feed rankings data
app.get('/rankings', (req, res) => {
  let friendId = 1;
  db.client.query(`
    select id, firstname, lastname, picture, descriptionmessage,
      (
        select array_to_json(array_agg(row_to_json(d)))
        from (
          select *,
          (
            select username
            from users
            where users.id = friends.friendId
          ) as friendusername ,
          (
            select picture
            from users
            where users.id = friends.friendId
          ) as profilephoto ,
          (
            select firstname
            from users
            where users.id = friends.friendId
          ) as friendfirst ,
          (
            select lastname
            from users
            where users.id = friends.friendId
          ) as friendlast ,
          (
            select array_to_json(array_agg(row_to_json(d)))
            from (
              select watergoal, caloriegoal, weightgoal,
              (
                select avg(water)/watergoal
                from dailyData
                where dailyData.userId = friendId
              ) as wateraverage ,
              (
                select avg(calories)/caloriegoal
                from dailyData
                where dailyData.userId = friendId
              ) as caloriesaverage ,
              (
                select avg(weight)/weightgoal
                from dailyData
                where dailyData.userId = friendId
              ) as weightaverage
              from goals
              where goals.userId = friendId
            ) d
          ) as goals
          from friends
          where friends.userID = users.id
        ) d
      ) as friends
    from users
    where users.id = ${friendId}
  `, (err, data) => {
    if (err) {
      // console.log('error from server -', err)
      res.send(err);
    } else {
      // console.log('rows from server /rankings - ', data.rows)
      res.send(data.rows);
    }
  })
});


app.listen(port, function () {
  console.log(`listening on port ${port}`);
});