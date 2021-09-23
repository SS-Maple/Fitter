const { useAuth } = require('../../user-auth.js');
const axios = require('axios');

const deleteNotifications = () => {
  const auth = useAuth();
  const userId = auth.userId;

  axios.put(`/notifications/delete?userId=${userId}`)
};

module.exports = deleteNotifications;