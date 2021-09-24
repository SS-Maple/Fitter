const { useAuth } = require('../../user-auth.js');
const axios = require('axios');

const deleteNotifications = (userId) => {
  axios.put(`/notifications/delete?userId=${userId}`)
};

module.exports = deleteNotifications;