import React from 'react';
import Logo from './TopBarComponents/Logo.jsx';
import NotificationIcon from './TopBarComponents/NotificationIcon.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../user-auth.js';
const generateNewNotifications = require('../notifications/notificationHelpers/generateNewNotifications.js');

const TopBar = (props) => {
  const auth = useAuth();
  const userId = auth.userId; // Is this grabbing the userId correctly?

  const { loggedIn } = props;

  if (loggedIn) {
    let newNotifications = generateNewNotifications(userId);
  }

  return (
    <div className="topbar">
      <div id="emptyDiv" />
        <Logo id="logo" />
        {
          loggedIn ? (
            <Link to={{pathname: '/notifications'}}>
              <NotificationIcon id="notificationIcon" newNotifications={newNotifications} />
            </ Link>
          ) : (
            <div id="emptyDiv" />
          )
        }
    </div>
  );
};

export default TopBar;


