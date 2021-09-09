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


  // select row_to_json(t)
  // from (
  //   select *,
  //     (
  //       select array_to_json(array_agg(row_to_json(d)))
  //       from (
  //         select *, (
  //           select array_to_json(array_agg(row_to_json(d)))
  //           from (
  //             select *
  //             from goals
  //             where goals.userId = users.id
  //           ) d
  //         ) as goals
  //         from friends
  //         where friends.friendid = users.id
  //       ) d 
  //     ) as friends
  //   from users
  //   where users.id = 1
  // ) t

  db.client.query(`
  
  select row_to_json(t)
  from (
    select *,
      (
        select array_to_json(array_agg(row_to_json(d)))
        from (
          select *, (
            select array_to_json(array_agg(row_to_json(d)))
            from (
              select *
              from goals
              where goals.userId = users.id
            ) d
          ) as goals
          from friends
          where friends.userID = users.id 
        ) d 
      ) as friends
    from users
    where users.id = 1
  ) t
  
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