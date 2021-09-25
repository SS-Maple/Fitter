import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../user-auth.js';
const getNotifications = require('./notificationHelpers/getNotifications.js');
const deleteNotifications = require('./notificationHelpers/deleteNotifications.js');

const Notifications = () => {
  const auth = useAuth();
  const [ userId, setUserId ] = useState(auth.userId);
  const [ newNotifications, setNewNotifications ] = useState(['Hello', 'Hey you']);
  const [ oldNotifications, setOldNotifications ] = useState(['Old stuff', 'More old Stuff']);
  let updateDbBoolean = false;
  let labels = {
    new: 'New Notifications',
    old: 'Old Notifications',
    delete: 'Delete Notifications',
    none: 'You have no notifications to display'
  };

  React.useEffect(() => {
    let notifications = [[],[]];

    axios.get(`/notifications?userId=${userId}`)
      .then(data => {
        console.log('data in Notif', data);
        if (data.data.length > 0) {
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].new === true) {
              notifications[0].push(data.data[i]);
            } else {
              notifications[1].push(data.data[i])
            }
          }
        }
        return notifications;
      })
      .then((notifications) => {
        setNewNotifications(notifications[0])
        setOldNotifications(notifications[1])
      })
      .then(() => {
        updateDbBoolean = true;
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  if (updateDbBoolean) {
    axios.put(`/notifications?userId=${userId}`)
  }

  if (newNotifications || oldNotifications) {
    return (
      <div id="notificationsPage">
        {
          newNotifications.length > 0 ? (
            <div className="notificationBoxes">
              <div id="notificationsHeader">
                {labels.new}
              </div>
              <div>
              {
                newNotifications.map((notification, index) => {
                  return (
                    <div id="notificationsTile" key={index}>
                      {notification.notificationtext}
                    </div>
                  );
                })
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
                oldNotifications.map((notification, index) => {
                  return (
                    <div id="notificationsTile" key={index}>
                      {notification.notificationtext}
                    </div>
                  );
                })
              }
              </div>
            </div>
          ) : null
        }
        <button id="deleteNotifications" onClick={() => {
          deleteNotifications(userId);
          setNewNotifications([]);
          setOldNotifications([]);
        }}>
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