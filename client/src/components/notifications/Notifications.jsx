import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

const Notifications = (props) => {
  let { notifications } = props;
  let notificationsLabel = 'Notifications'
  let deleteMessage = 'Clear All Notifications'
  if (notifications.length > 0) {
    return (
      <div id="notificationsPage">
        <div id="notificationsHeader">
          {notificationsLabel}
        </div>
        {
          notifications.forEach((notification, index) => (
            <div id="notificationsTile">

            </div>
          ))
        }
        <button id="deleteNotifications">
          {deleteMessage}
        </button>
      </div>
    );
  } else {
    let message = 'You have no notifications to display.';
    return (
      <div id="notificationsPage">
        <div id="notificationsHeader">
          {notificationsLabel}
        </div>
        <div id="notificationsTile">
          {message}
        </div>
      </div>

    );
  }
};

Notifications.propTypes = {

};

export default Notifications;