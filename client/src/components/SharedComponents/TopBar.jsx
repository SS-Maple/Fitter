import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import Logo from './TopBarComponents/Logo.jsx';
import NotificationIcon from './TopBarComponents/NotificationIcon.jsx';

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render () {
    return (
      <div id="topbar">
        <div id="emptyDiv" />
        <Logo id="logo"/>
        <NotificationIcon id="notificaitonIcon" />
      </div>

    )
  }
};

export default TopBar;


