const db = require('../database/connect.js');

module.exports = {
  getChatUser: (userId) => {
    let queryString = 'SELECT * FROM users WHERE id = $1';
    let values = [userId];
    return db.client
      .query(queryString, values)
      .then(results => results.rows)
      .catch(error => error);
  },
  getChatUserFriends: (userId) => {
    let queryString = 'SELECT * FROM friends JOIN users ON friends.friendid = users.id WHERE userid = $1 ORDER BY users.frirstname';
    let values = [userId];
    return db.client
      .query(queryString, values)
      .then(results => results.rows)
      .catch(error => error);
  }
}