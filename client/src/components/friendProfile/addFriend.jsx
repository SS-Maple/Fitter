import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// {id: 4,
// userid: 1,
// friendid: 7,
// friendusername: 'gogreg',
// profilephoto: 'https://randomuser.me/api/portraits/men/60.jpg',
// sorting: "5.25",
// userid: 1}

const AddFriend = (props) => {
  const [friended, setFriend] = useState(false);

  const addFriend = () => {
    axios.post('/addFriend', {friendID: props.friendid, userID: props.userid})
    .then(result => {
      setFriend(true)
    })
    .catch(err => {
      console.log('ERROR in axios post to /addFriend catch block: ', err)
    })
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