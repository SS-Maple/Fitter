import React from 'react';
import '../../../../dist/style.css';

class NotificationIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    let newNotifications = false;
    return (
      <>
        {newNotifications ?
          (
            <button id="notificationButton">
              <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#33'}} />
            </button>
          ) : (
            <button id="notificationButton">
              <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#9742'}} />
            </button>
          )
        }
      </>
    )
  }
};

export default NotificationIcon;