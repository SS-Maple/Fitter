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
    let queryString = 'SELECT * FROM friends f JOIN users u ON f.friendid = u.id WHERE userid = $1 ORDER BY u.firstname';
    let values = [userId];
    return db.client
      .query(queryString, values)
      .then(results => results.rows)
      .catch(error => error);
  }
}