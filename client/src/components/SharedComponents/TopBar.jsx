import React from 'react';
import Logo from './TopBarComponents/Logo.jsx';
import NotificationIcon from './TopBarComponents/NotificationIcon.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../user-auth.js';
import generateNewNotifications from '../notifications/notificationHelpers/generateNewNotifications.js';

const TopBar = (props) => {
  const auth = useAuth();
  const userId = auth.userId;
  let newNotification = false;

  const { loggedIn } = props;

  if (loggedIn) {
    newNotification = generateNewNotifications(userId);
    console.log('logged in', newNotification);
  }

  return (
    <div className="topbar">
      <div id="emptyDiv" />
        <Logo id="logo" />
        {
          loggedIn ? (
            <Link to={{pathname: '/notifications'}}>
              <NotificationIcon id="notificationIcon" newNotifications={newNotification} />
            </ Link>
          ) : (
            <div id="emptyDiv" />
          )
        }
    </div>
  );
};

export default TopBar;