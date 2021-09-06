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
      <div>
        <Logo />
        <NotificationIcon />
      </div>

    )
  }
};

export default TopBar;

const TopBarWrapper = styled.div`
  background: e25786;
`;

