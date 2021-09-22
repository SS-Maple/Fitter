import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const AddFriend = (props) => {

  const [friended, setFriend] = useState(props.isFriend);

  const addFriend = () => {
    axios.post('/addfriend', {friendID: props.friendid, userID: props.userid})
    .then(result => {
      setFriend(true)
    })
    .catch(err => {
      console.log('ERROR in axios post to /addFriend catch block: ', err)
    })
  };

  const removeFriend = () => {
    axios.delete('/removefriend', {friendID: props.friendid, userID: props.userid})
    .then(result => {
      setFriend(false)
    })
    .catch(err => {
      console.log('ERROR in axios post to /addFriend catch block: ', err)
    })
  };

  if (!friended) {
    return <button className='profile-btn' onClick={addFriend}> Add Friend+ </button>
  } else {
    return <button className='profile-btn' onClick={removeFriend}> Remove Friend- </button>

  }
};

export default AddFriend;