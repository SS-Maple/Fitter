const axios = require('axios');

const generateNewNotifications = (userId) => {
  let newNotifications = false;
  // axios.get user's target goals and current values
  axios.get(`/notifications/users/goals?userId=${userId}`)
    .then((data) => {
      // POSTS if goals are not entered
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

        // POSTS if daily goals are not entered > 2 days
  axios.get(`/notifications/users/timestamp?userId=${userId}`)
    .then((data) => {
      let todayDate = new Date;
      let dateNum = parseInt(todayDate.getDate());
      let timestampDate = data.data.timestamp.toString().slice(8, 10);
      timestampDate = parseInt(timestampDate[1]);
      if (dateNum - timestampDate < -2 || dateNum - timestampDate > 2) {
        let queryString = `userId=${userId}&notificationsText='Please update your daily goals!'`;
        console.log(queryString);
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