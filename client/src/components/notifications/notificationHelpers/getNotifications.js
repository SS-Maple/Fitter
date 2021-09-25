const axios = require('axios');

const getNotifications = (userId) => {
  let notifications = [[],[]];

  axios.get(`/notifications?userId=${userId}`)
    .then(data => {
      if (data.data.length > 0) {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].new === true) {
            notifications[0].push(data.data[i]);
          } else {
            notifications[1].push(data.data[i])
          }
        }
      }
    })
    .catch(err => {
      throw new Error(err);
    });

    console.log('data in getNotifs', notifications);

    return notifications;
}

module.exports = getNotifications;
