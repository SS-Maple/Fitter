const express = require('express');
const { useReducer } = require('react');

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
          order by friendfirst
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
  // let userId = 1;
  const { userid } = req.query;
  return db.client.query(`
  SELECT water, calories, weight FROM dailydata where userid=${userid} AND timestamp = date(now());
  `)
    .then(results => res.send(results.rows[0]))
    .catch(err => res.send(err))
})

app.get('/userdata', (req, res) => {
  const { userId } = req.query;
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
      weight,
      shareBoolean
      FROM dailyData WHERE userId=users.id
      ORDER BY timestamp DESC)b) AS stats,
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
    .catch(err => console.error('userData', err))
})
app.get('/getStats', (req, res) => {
  return db.client.query(`
  SELECT array_to_json(array_agg(row_to_json(a)))
  FROM ( SELECT
    id,
    to_char(timestamp, 'Month DD, YYYY') AS date,
    water,
    calories,
    weight,
    shareBoolean FROM dailydata WHERE userid=${req.query.userid}
    ORDER BY timestamp DESC)a;
  `)
  .then(results => res.send(results.rows[0].array_to_json))
  .catch(err => console.error('getstats', err))
})

app.put('/updatephoto', (req,res) => {
  const {photo, userid} = req.body;
  return db.client.query(`
    UPDATE users SET picture='${photo}' WHERE id=${userid}
  `)
  .then(() => res.sendStatus(200))
  .catch(err => console.error('updatephoto', err))
})

app.put('/updategoals', (req, res) => {
  const {userid, watergoal, caloriegoal, weightgoal, share} = req.body;

  return db.client.query(`
  INSERT INTO goals (userId, waterGoal, calorieGoal, weightGoal, shareBoolean) VALUES (${userid}, ${watergoal}, ${caloriegoal}, ${weightgoal}, ${share})
  ON CONFLICT (userId)
  DO
    UPDATE SET waterGoal=excluded.waterGoal, calorieGoal=excluded.calorieGoal, weightGoal=excluded.weightGoal, shareBoolean = excluded.shareBoolean;
  `)
  .then(() => res.sendStatus(200))
  .catch(err => console.error('updategoals', err))
})

app.put('/updateStatShare', (req, res) => {
  const {id, share} = req.body;
  return db.client.query(`
  UPDATE dailyData SET shareboolean=${share} where id=${id}
  `)
    .then(() => res.sendStatus(200))
    .catch(err => console.error('updateStatShare', err))
})

//updates today's goal status
app.put('/updateToday', (req, res) => {
  const { userid, category, value } = req.body;
  return db.client.query(`
  INSERT INTO dailydata (userID, timestamp, ${category}) VALUES (${userid}, current_date, ${Number(value)})
  ON CONFLICT (timestamp)
  DO
    UPDATE SET ${category}=dailydata.${category} + excluded.${category} RETURNING userID;
  `)
    .then((result) => res.send(result.rows[0]))
    .catch(err => console.error('updateToday', err))
})

// get home feed rankings data
app.get(`/rankings`, (req, res) => {
  let friendId = req.query.friendId;
  db.client.query(`
  SELECT friendId FROM friends
  WHERE userid = ${friendId}
  `, (err, data) => {
    if (err) {
      // console.log('error from server -', err)
      res.send(err);
    } else {
      let info = data.rows;
      if (info.length === 0) {
        // console.log('there are no friends')
        res.send(info)
      } else {
        //  console.log('there are friends')
         let temp = [];
         info.forEach(friend => temp.push(friend.friendid))
         temp.push(friendId)
         let inner = () => {
           let condition = '';
           temp.forEach(user => condition += `id = ${user} OR `)
           let tempDataCondition = '';
           temp.forEach(user => tempDataCondition += ` goals.userId = ${user} OR `)
           let dataCondition = tempDataCondition.substring(0, tempDataCondition.length - 3)
           let tempString =
           ` select id, firstname, lastname, picture, descriptionmessage, username,
             (
               select array_to_json(array_agg(row_to_json(d)))
               from (
                 select userid, watergoal, caloriegoal, weightgoal,
                 (
                   select avg(water)/watergoal
                   from dailyData
                 ) as wateraverage ,
                 (
                   select avg(calories)/caloriegoal
                   from dailyData
                 ) as caloriesaverage ,
                 (
                   select avg(weight)/weightgoal
                   from dailyData
                 ) as weightaverage
                 from goals
                 where ${dataCondition}
               ) d
             ) as userdata
           from users
           WHERE ${condition}`
           let queryString = tempString.substring(0, tempString.length - 3)
           return db.client.query(`
             ${queryString}
           `, (err, data) => {
             if (err) {
               console.log('error from server -', err)
               // console.log(queryString)
               res.send(err);
             } else {
               // console.log('rows from server /users - ', data.rows)
               let rankingInfo = data.rows;
              //  console.log('----->  before', rankingInfo)
   
               let arrayInfo = [];
               rankingInfo.forEach((friend, index) => {
                 // returns negative if they missed the goal
                 let water = Math.abs(100 - (friend['userdata'][index]['wateraverage'] * 100))
                 // returns negative if goal is exceeded
                 let calories = Math.abs(100 - (friend['userdata'][index]['caloriesaverage'] * 100))
                 let calculate = water + calories;
                 friend['newId'] = friend['userdata'][index]['userid'];
                 friend['sorting'] = calculate.toFixed(2);
                 friend['wateraverage'] = friend['userdata'][index]['wateraverage'];
                 friend['caloriesaverage'] = friend['userdata'][index]['caloriesaverage'];
                 friend['weightaverage'] = friend['userdata'][index]['weightaverage'];
                 delete friend['userdata'];
               })
               rankingInfo.sort((a, b) => a.sorting - b.sorting).forEach((user, index) => user['ranks'] = (index + 1))
   
               // rankingInfo.filter(user => user.id === userId).map(user => user.ranks).toString()
               
               res.send(rankingInfo);
             }
           })
         }
         inner();
       }
      }
  })
});

// get friend profile information
// SELECT * FROM dailyData
// WHERE userID = ${friendId} AND shareBoolean=true
// ORDER BY timestamp
app.get('/friendProfile', (req, res) => {
  console.log('madeit')

  var params = req.headers.referer.split('?')[1].split('=')[1].split('')[0]
  var useridparams = req.headers.referer.split('&')[1].split('=')[1]

  // console.log('rq', params, useridparams)
  // let friendId = parseInt(req.query);
  let friendId = parseInt(params);
  let userId = parseInt(useridparams);
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
        console.log('error from server', err)
        res.send(err);
      } else {
        var returnRes = data.rows[0]
        returnRes['userid'] = userId
        returnRes['friendid'] = friendId
        // console.log('rows from server /friendprofile - ', data.rows[0])
        res.send(returnRes);
      }
    })
});
app.get('/isfriend', (req, res) => {
  let friendId = 7;
  let userId = 1;
  // let friendId = req.body.friendID
  // let userId = req.body.userID
  db.client.query(`
    SELECT * from friends WHERE userID=${userId} AND friendID=${friendId}`, (err, data) => {
    if (err) {
      // console.log('error from server', err)
      res.send(err);
    } else {

      console.log('success in isfriend', data)
      res.send(data);
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
app.post('/comment', (req, res) => {
  console.log('looking for this', typeof(req.body['comment']))

  var userId = parseInt(req.body['userid'])
  var friendId = parseInt(req.body['friendid'])
  var comment = req.body['comment']
  var tileId = parseInt(req.body['commentid'])
  console.log(userId, friendId, comment, tileId)
  db.client.query(`
    INSERT INTO comments (userID, friendID, comment, tileId) VALUES (${userId}, ${friendId},'', ${tileId});`, (err, data) => {
      if (err) {
        console.log('error from server', err)
        res.send(err);
      } else {
        res.sendStatus(204);
      }
    })
})
// post user sign in information and send auth token + user id
app.post('/signin', (req, res) => {
  let users = req.body;
  let text = 'INSERT INTO users(firstname, lastname, email, username, userpassword, securityquestion, securityanswer) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, userpassword';
  let values = [users.firstname, users.lastname, users.email, users.username, users.userpassword, users.securityquestion, users.securityanswer]

  db.client.query(text, values)
  .then(data => {
    if (data.rowCount === 1) {
      let result = data.rows[0];
      res.send({
        userId: result.id,
        email: result.email,
        password: result.userpassword
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

    res.send({
      userId: data.rows[0].id
    })
  })
  .catch(err => console.log('Error logging in', err))
})
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});


