import React from 'react';
import '../../../../dist/style.css';

class NotificationIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('Notification click');
  }

  render() {
    let newNotifications = false;
    return (
      <>
        {newNotifications ?
          (
            <button id="notificationButton" onClick={this.onClick}>
              <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#33'}} />
            </button>
          ) : (
            <button id="notificationButton" onClick={this.onClick}>
              <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#9742'}} />
            </button>
          )
        }
      </>
    )
  }
};

export default NotificationIcon;