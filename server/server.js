const express = require('express');

let app = express();
let port = 3000;

const db = require('../database/connect.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
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
  let friendId = req.query.friendId;
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
            select descriptionMessage
            from users
            where users.id = friends.friendId
          ) as description ,
          (
            select firstname
            from users
            where users.id = friends.friendId
          ) as friendfirst ,
          (
            select lastname
            from users
            where users.id = friends.friendId
          ) as friendlast
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
      // console.log('rows from server /friends - ', data.rows)
      res.send(data.rows);
    }
  })
});

app.get('/todaysgoals', (req, res) => {
  //test id
  let userId = 1;
  return db.client.query(`
  SELECT water, calories, weight FROM dailydata where userid=${userId} AND timestamp = date(now());
  `)
    .then(results => res.send(results.rows[0]))
    .catch(err => console.error(err))
})

app.get('/userdata', (req, res) => {
  //test id
  let userId = 1;
  return db.client.query(`
  SELECT array_agg(row_to_json(a))
  FROM (
    SELECT id,
    firstName,
    lastName,
    birthday,
    email,
    descriptionmessage AS intro,
    picture,
    (SELECT count(friendid) from friends where userid=${userId}) AS friendcount,
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

app.put('/updatephoto', (req, res) => {
  const { photo, userid } = req.body;
  // console.log(req.body)
  return db.client.query(`
    UPDATE users SET picture='${photo}' WHERE id=${userid}
  `)
    .then(() => res.sendStatus(200))
    .catch(err => console.error('hello', err))
})

app.put('/updategoals', (req, res) => {
  const { userid, watergoal, caloriegoal, weightgoal } = req.body;
  return db.client.query(`
  INSERT INTO goals (userId, waterGoal, calorieGoal, weightGoal) VALUES (${userid}, ${watergoal}, ${caloriegoal}, ${weightgoal})
  ON CONFLICT (userId)
  DO
    UPDATE SET waterGoal=excluded.waterGoal, calorieGoal=excluded.calorieGoal, weightGoal=excluded.weightGoal;
  `)
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

//updates today's goal status
app.put('/updateToday', (req, res) => {
  const { userid, category, value } = req.body;
  return db.client.query(`
  INSERT INTO dailydata (userID, timestamp, ${category}) VALUES (${userid}, now(), ${Number(value)})
  ON CONFLICT (timestamp)
  DO
    UPDATE SET ${category}=dailydata.${category} + excluded.${category};
  `)
    .then(() => res.sendStatus(200))
    .catch(err => console.error(err))
})

// get home feed rankings data
app.get(`/rankings`, (req, res) => {
  let friendId = req.query.friendId;
  db.client.query(`
    select id, firstname, lastname, picture, descriptionmessage,

    (
      select array_to_json(array_agg(row_to_json(d)))
      from (
        select watergoal, caloriegoal, weightgoal,
        (
          select avg(water)/watergoal
          from dailyData
          where dailyData.userId = 1
        ) as wateraverage ,
        (
          select avg(calories)/caloriegoal
          from dailyData
          where dailyData.userId = 1
        ) as caloriesaverage ,
        (
          select avg(weight)/weightgoal
          from dailyData
          where dailyData.userId = 1
        ) as weightaverage
        from goals
        where goals.userId = 1
      ) d
    ) as userdata,

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
      console.log('error from server -', err)
      res.send(err);
    } else {
      console.log('rows from server /rankings - ', data.rows)
      res.send(data.rows);
    }
  })
});

// get friend profile information
// SELECT * FROM dailyData
// WHERE userID = ${friendId} AND shareBoolean=true
// ORDER BY timestamp
app.get('/friendProfile', (req, res) => {
  let friendId = 7;
  let userId = 1;
  db.client.query(`
      SELECT username, firstName, lastName, descriptionMessage, picture,
        (
          select array_to_json(array_agg(row_to_json(d)))
          from (
            SELECT userID,
            to_char(timestamp, 'Month DD, YYYY') AS date,
            water, calories, weight
            from dailydata
            WHERE userID=${friendId} AND shareBoolean=true
            ORDER BY timestamp
          ) d
        ) as dlydata,
        (
          select row_to_json(e)
          from (
            SELECT userID,
            waterGoal,
            calorieGoal,
            weightGoal
            from goals
            WHERE userID=${friendId}
          ) e
        ) as goals,
        (
          select row_to_json(f)
          from (
            SELECT userID,
            friendID
            from friends
            WHERE userID=${userId} AND friendID=${friendId}
          ) f
        ) as isFriend,
        (
          select array_to_json(array_agg(row_to_json(g)))
          from (
            SELECT userID,
            friendID
            from friends
            WHERE userID=${friendId}
          ) g
        ) as fiends
      from users
      WHERE users.id=${friendId}`,
    (err, data) => {
      if (err) {
        // console.log('error from server', err)
        res.send(err);
      } else {
        // console.log('rows from server /friendprofile - ', data.rows[0])
        res.send(data.rows[0]);
      }
    })
});

app.post('/addfriend', (req, res) => {
  let friendId = 7;
  let userId = 1;
  // let friendId = req.body.friendID
  // let userId = req.body.userID
  db.client.query(`
    INSERT INTO friends (userID, friendID)
    VALUES (${userId}, ${friendId})
  `, (err, data) => {
    if (err) {
      // console.log('error from server', err)
      res.send(err);
    } else {
      // console.log('success in add friend')
      res.sendStatus(204);
    }
  })
});

app.delete('/removefriend', (req, res) => {
  let friendId = 7;
  let userId = 1;

  // let friendId = req.body.friendID
  // let userId = req.body.userID
  db.client.query(`
    DELETE from friends
    WHERE userID=${userId} AND friendID=${friendId}
  `, (err, data) => {
    if (err) {
      // console.log('error from server', err)
      res.send(err);
    } else {
      res.sendStatus(204);
    }
  })
});

// post user sign in information and send auth token + user id
app.post('/signin', (req, res) => {
  let users = req.body;
  let text = 'INSERT INTO users(firstname, lastname, email, username, userpassword, securityquestion, securityanswer) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id';
  let values = [users.firstname, users.lastname, users.email, users.username, users.userpassword, users.securityquestion, users.securityanswer]

  db.client.query(text, values)
  .then(data => {

    if (data.rowCount === 1) {
      res.send({
        token: 'test123',
        userId: data.rows[0].id
      })
    }
  })
  .catch(err => res.send(err))
})

// post user login and send auth token
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // check if the email is in the db
  db.client.query(`SELECT id FROM users WHERE users.email = '${email}'`)
  .then(data => {
    if (!data.rowCount) {
      throw new Error('email does not exist');
    }
    console.log('logindata', data)
    res.send({
      userId: data.rows[0].id
    })
  })
  .catch(err => console.log('Error logging in', err))
})
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


