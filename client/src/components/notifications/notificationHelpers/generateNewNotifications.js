const axios = require('axios');

const generateNewNotifications = (userId) => {
  let newNotifications = false;
  axios.get(`/notifications/users/goals?userId=${userId}`)
    .then((data) => {
      if (data.data.water < 1) {
        let queryString = `userId=${userId}&notificationsText='Please update your water goal!'`;
        axios.post(`/notifications?${queryString}`);
        newNotifications = true;
      }
      if (data.data.calories < 1) {
        let queryString = `userId=${userId}&notificationsText='Please update your calorie goal!'`;
        axios.post(`/notifications?${queryString}`);
        newNotifications = true;
      }
      if (data.data.weight < 1) {
        let queryString = `userId=${userId}&notificationsText='Please update your weight goal!'`;
        axios.post(`/notifications?${queryString}`);
        newNotifications = true;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });

  axios.get(`/notifications/users/timestamp?userId=${userId}`)
    .then((data) => {
      let todayDate = new Date;
      let dateNum = parseInt(todayDate.getDate());
      let timestampDate = data.data.timestamp.toString().slice(8, 10);
      timestampDate = parseInt(timestampDate[1]);
      let diff = Math.abs(dateNum - timestampDate);
      if (diff > 2) {
        let queryString = `userId=${userId}&notificationsText='Please update your daily goals!'`;
        axios.post(`/notifications?${queryString}`);
        newNotifications = true;
      }
    })
    .catch( err => {
      throw new Error(err);
    });

  return newNotifications;
};

module.exports = generateNewNotifications;