import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const MessageButton = (props) => {
  const [sendMessage, setMessage] = useState(false);
  const clickMessage = () => {
    setMessage(true)
  };
  return <button className='profile-btn' onClick={clickMessage}> Message </button>

}

export default MessageButton;