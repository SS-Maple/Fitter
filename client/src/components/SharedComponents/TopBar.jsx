import React, { useState, useEffect } from 'react';
import Logo from './TopBarComponents/Logo.jsx';
import NotificationIcon from './TopBarComponents/NotificationIcon.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../user-auth.js';
import getNotifications from '../notifications/notificationHelpers/getNotifications.js';

const TopBar = (props) => {
  const auth = useAuth();
  const userId = auth.userId;
  const [ newNotifications, setNewNotifications ] = useState(false);
  let loggedIn = false;

  if (userId) {
    loggedIn = true;
    let notifications = getNotifications(userId);
    if (notifications[0].length > 0) {
        useEffect(() => {
          setNewNotifications(true);
        }, []);
      }
  }

  return (
    <div className="topbar">
      <div id="emptyDiv" />
        <Logo id="logo" />
        {
          loggedIn ? (
            <Link to={{pathname: '/notifications'}} style={{ textDecoration: 'none' }}>
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