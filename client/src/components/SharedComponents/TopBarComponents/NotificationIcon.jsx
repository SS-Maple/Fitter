import React from 'react';

const NotificationIcon = (props) => {
  return (
    <>
      {props.newNotifications ?
        (
            <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#33'}} />
        ) : (
            <div id="notificationIcon" dangerouslySetInnerHTML={{__html: '&#9742'}} />
        )
      }
    </>
  );
};

export default NotificationIcon;