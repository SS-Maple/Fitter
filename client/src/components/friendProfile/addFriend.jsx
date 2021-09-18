import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// {id: 4,
// userid: 1,
// friendid: 7,
// friendusername: 'gogreg',
// profilephoto: 'https://randomuser.me/api/portraits/men/60.jpg',
// sorting: "5.25",
// userid: 1}

const AddFriend = (props) => {
  // const [friended, setFriend] = useState(false);
  console.log('222', props.isFriend)
  const [friended, setFriend] = useState(props.isFriend);
  console.log('hereeeee', friended)
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

  console.log('fdd', friended)
  if (!friended) {
    console.log('fdd', friended)
    return <button className='profile-btn' onClick={addFriend}> Add Friend+ </button>
  } else {
    console.log('fdd', friended)
    return <button className='profile-btn' onClick={removeFriend}> Remove Friend- </button>

  }
};

export default AddFriend;