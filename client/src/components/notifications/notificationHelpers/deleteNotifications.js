const { useAuth } = require('../../user-auth.js');
const axios = require('axios');

const deleteNotifications = () => {
  const auth = useAuth();
  const userId = auth.userId;

  axios.delete(`/notifications?userId=${userId}`)
    .then((data) => {
      console.log('Deleted');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = deleteNotifications;