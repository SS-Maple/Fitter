import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const AddFriend = (props) => {
  const [friended, setFriend] = useState(false);
  const addFriend = () => {
    setFriend(true)
  };
  const removeFriend = () => {
    setFriend(false)
  };


  if (friended) {
    return <button className="xxbtn" onClick={removeFriend}> Remove Friend- </button>
  } else {
    return <button className="xxbtn" onClick={addFriend}> Add Friend+ </button>
  }
};

export default AddFriend;