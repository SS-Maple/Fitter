import React, { useState, useEffect } from 'react';
import { useAuth } from '../user-auth.js';
const getNotifications = require('./notificationHelpers/getNotifications.js');
const deleteNotifications = require('./notificationHelpers/deleteNotifications.js');

const Notifications = () => {
  const auth = useAuth();

  const [ userId, setUserId ] = useState(auth.userId);
  const [ newNotifications, setNewNotifications ] = useState([]);
  const [ oldNotifications, setOldNotifications ] = useState([]);

  let notifications = getNotifications(userId);

  React.useEffect(() => {
    setNewNotifications(notifications.new);
    setOldNotifications(notifications.old);
  }, []);

  let labels = {
    new: 'New Notifications',
    old: 'Old Notifications',
    delete: 'Delete Notifications',
    none: 'You have no notifications to display'
  };

  const handleDeleteClick = () => {
    deleteNotifications(userId);
    React.useEffect(() => {
      setNewNotifications([]);
      setOldNotifications([]);
    }, []);
  }

  console.log('newNotifications: ', newNotifications);
  console.log('oldNotifications: ', oldNotifications);

  if (newNotifications || oldNotifications) {
    return (
      <div id="notificationsPage">
        {
          newNotifications ? (
            <div className="notificationBoxes">
              <div id="notificationsHeader">
                {labels.new}
              </div>
              <div>
              {
                newNotifications.map((notification) => (
                    <div id="notificationsTile">
                      {notification.notificationtext}
                    </div>
                  ))
              }
              </div>
            </div>
           ) : null
        }
        {
          oldNotifications ? (
            <div className="notificationBoxes">
              <div id="notificationsHeader">
                {labels.old}
              </div>
              <div>
              {
                oldNotifications.map((notification) => (
                    <div id="notificationsTile">
                      {notification.notificationtext}
                    </div>
                ))
              }
              </div>
            </div>
          ) : null
        }
        <button id="deleteNotifications" onClick={handleDeleteClick}>
          {labels.delete}
        </button>
      </div>
    );
  } else {
    return (
      <div id="notificationsPage">
        <div id="notificationsHeader">
          {labels.new}
        </div>
        <div id="notificationsTile">
          {labels.none}
        </div>
      </div>

    );
  }
};

export default Notifications;