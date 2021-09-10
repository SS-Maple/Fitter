import React from 'react';
import '../../../../dist/style.css';

const NotificationIcon = (props) => {
  let { onClick, newNotifications } = props;
  return (
    <>
      {newNotifications ?
        (
          <button id="notificationButton" onClick={onClick}>
            <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#33'}} />
          </button>
        ) : (
          <button id="notificationButton" onClick={onClick}>
            <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#9742'}} />
          </button>
        )
      }
    </>
  );
};

export default NotificationIcon;