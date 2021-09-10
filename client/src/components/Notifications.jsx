import React from ('react');
import styled from ('styled-components');
import axios from ('axios');
import PropTypes from ('prop-types');

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      notifications: []
    };
  }

  getNotifications() {
    axios.get(`/notifications?userId=${this.props.userId}`)
      .then(data => {
        console.log('data from query', data);
      }
  }

  render() {
    return (



    )
  }
};

Notifications.propTypes = {

};