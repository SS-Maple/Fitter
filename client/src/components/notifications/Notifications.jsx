import React from 'react';
import { useAuth } from '../user-auth.js';
const getNotifications = require('./notificationHelpers/getNotifications.js');
const deleteNotifications = require('./notificationHelpers/deleteNotifications.js');

const Notifications = () => {
  const auth = useAuth();
  const userId = auth.userId;

  let notifications = getNotifications(userId);

  let labels = {
    new: 'New Notifications',
    old: 'Old Notifications',
    delete: 'Delete Notifications',
    none: 'You have no notifications to display'
  };

  let newNotifications = notifications.new;
  let oldNotifications = notifications.old;
  console.log('notifications.new: ', newNotifications);
  console.log('notifications.old: ', oldNotifications);

  if (newNotifications || oldNotifications) {
    return (
      <div id="notificationsPage">
        {
          newNotifications ? (
            <div className="notificationBoxes">
              <div id="notificationsHeader">
                {labels.new}
              </div>
              {
                newNotifications.map((notification) => {
                  return (
                    <div id="notificationsTile">
                      {notification.notificationtext}
                    </div>
                  )
                })
              }
            </div>
           ) : null
        }
        {
          oldNotifications ? (
            <div className="notificationBoxes">
              <div id="notificationsHeader">
                {labels.old}
              </div>
              {
                oldNotifications.map((notification) => {
                  return (
                    <div id="notificationsTile">
                      {notification.notificationtext}
                    </div>
                  )
                })
              }
            </div>
          ) : null
        }
        <button id="deleteNotifications" onClick={deleteNotifications}>
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