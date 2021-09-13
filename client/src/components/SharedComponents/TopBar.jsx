import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import Logo from './TopBarComponents/Logo.jsx';
import NotificationIcon from './TopBarComponents/NotificationIcon.jsx';

const TopBar = (props) => {
  const { logoOnClick, notificationOnClick, newNotifications, loggedIn } = props;
  return (
    <div id="topbar">
      <div id="emptyDiv" />
      <Logo id="logo" onClick={logoOnClick} />
      {
        loggedIn ? (
          <NotificationIcon id="notificationIcon"
          onClick={notificationOnClick}
          newNotifications={newNotifications}
        />
        ) : (
          <div id="emptyDiv" />
        )
      }
    </div>
  );
};

export default TopBar;


