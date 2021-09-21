import React from 'react';


const generateNewNotifications = (userId) => {
  let newNotifications = false;
  // axios.get user's target goals and current values
  axios.get(`/notifications/users?userId=${userId}`)
    .then((data) => {
      // Data is an array of objects [{goals},timestamp]
        // goals = {
        //   water
        //   calories
        //   weight
        // }

        // POSTS if goals are not entered
        if (data[0].water < 1) {
          let queryString = `userId=${userId}&notificationsText='Please update your water goal!'`;
          axios.post(`/notifications?${queryString}`);
          newNotifications = true;
        }
        if (data[0].calories < 1) {
          let queryString = `userId=${userId}&notificationsText='Please update your calorie goal!'`;
          axios.post(`/notifications?${queryString}`);
          newNotifications = true;
        }
        if (data[0].weight < 1) {
          let queryString = `userId=${userId}&notificationsText='Please update your weight goal!'`;
          axios.post(`/notifications?${queryString}`);
          newNotifications = true;
        }

        // POSTS if daily goals are not entered > 2 days
        let todayDate = new Date;
        let dateNum = parseInt(todayDate.getDate());
        let timestampDate = data[1].split('-');
        timestampDate = parseInt(timestampDate[1]);
        if (dateNum - timestampDate < -2 || dateNum - timestampDate > 2) {
          let queryString = `userId=${userId}&notificationsText='Please update your daily goals!'`;
          axios.post(`/notifications?${queryString}`);
          newNotifications = true;
        }
    })
    .catch( err => {
      throw new Error(err);
    });

    return newNotifications;
  }

moudle.exports.generateNewNotifications = generateNewNotifications;