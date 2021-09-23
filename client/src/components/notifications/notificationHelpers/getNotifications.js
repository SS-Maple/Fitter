const axios = require('axios');

const getNotifications = (userId) => {
  let notifications = {
    new: [],
    old: []
  };

  axios.get(`/notifications?userId=${userId}`)
    .then(data => {
      if (data.data.length > 0) {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].new === true) {
            notifications.new.push(data.data[i]);
          } else {
            notifications.old.push(data.data[i])
          }
        }
      }
    })
    .then(() => {
      axios.put(`/notifications?userId=${userId}`)
    })
    .catch(err => {
      throw new Error(err);
    });

    return notifications;
}

module.exports = getNotifications;
